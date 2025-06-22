import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export async function CabinList({filter}) {
  const cabins = await getCabins();
  if (cabins.length === 0) return null;
  let display = cabins;
  if(filter==='small'){
    display = cabins.filter((cabin)=>cabin.maxCapacity<=3);
  }else if(filter==='medium'){
    display = cabins.filter((cabin)=>(cabin.maxCapacity>3)&&(cabin.maxCapacity<=7));
  }else if(filter==='large'){
    display = cabins.filter((cabin)=>cabin.maxCapacity>7);
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {display.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
