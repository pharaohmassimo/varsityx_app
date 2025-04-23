"use client"

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Bottombar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <section className="bottombar w-full overflow-x-auto scrollbar-hide border-t border-dark-4 bg-dark-2">
  <div className="flex flex-nowrap items-center px-2 py-3 w-max">
    {sidebarLinks.map((link) => {
      const isActive =
        activePath &&
        ((activePath.includes(link.route) && link.route.length > 1) ||
          activePath === link.route);

      return (
        <Link
          href={link.route}
          key={link.label}
          className={`min-w-max flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
            isActive ? "bg-primary-500 text-white" : "text-light-1"
          }`}
        >
          <Image src={link.imgURL} alt={link.label} width={24} height={24} />
        </Link>
      );
    })}
  </div>
</section>
  );
}

export default Bottombar;
