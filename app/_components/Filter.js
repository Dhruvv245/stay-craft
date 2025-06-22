"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Button = ({ children, handleFilter, filter, activeFilter }) => {
  const isActive = activeFilter === filter;
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        isActive ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default function Filter() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('capacity') ?? 'all';
  const pathname = usePathname();
  const router = useRouter();
  const handleFilter = (filter) => {
    if (filter === "all") {
      router.replace(`${pathname}`, { scroll: false });
    } else {
      router.replace(`${pathname}?capacity=${filter}`, { scroll: false });
    }
  };
  return (
    <div className="border border-primary-800 fles">
      <Button handleFilter={handleFilter} filter="all" activeFilter={activeFilter}>
        All Cabins
      </Button>
      <Button handleFilter={handleFilter} filter="small" activeFilter={activeFilter}>
        1&mdash;3 guests
      </Button>
      <Button handleFilter={handleFilter} filter="medium" activeFilter={activeFilter}>
        4&mdash;7 guests
      </Button>
      <Button handleFilter={handleFilter} filter="large" activeFilter={activeFilter}>
        8&mdash;12 guests
      </Button>
    </div>
  );
}
