"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to perform this action!!");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID!!");
  const updateData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteReservation(id) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to perform this action!!");
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);
  if (!bookingIds.includes(id))
    throw new Error("You are not allowed to delete this reservation!!");
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error("Reservaion could not be deleted!!");
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to perform this action!!");
  const guestBookings = await getBookings(session.user.guestId);
  const bookingIds = guestBookings.map((booking) => booking.id);
  const numGuests = Number(formData.get("numGuests"));
  const observations = toString(formData.get("observations")).slice(0, 1000);
  const bookingId = Number(formData.get("bookingId"));
  const updateData = { numGuests, observations };
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this reservation!!");
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) throw new Error("Booking could not be updated");
  revalidatePath(`/account/reservations/${bookingId}`);
  revalidatePath('/account/reservations');
  redirect("/account/reservations");
}
