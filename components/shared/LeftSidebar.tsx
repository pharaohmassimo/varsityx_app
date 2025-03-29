"use client"

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                
                const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                
                if (link.route === "/profile") link.route = `${link.route}/${userId}`;

                return (
                    <Link
                        href={link.route}
                        key={link.label}
                        className={`leftsidebar_link ${isActive && 'bg-primary-900'} group flex items-center gap-3 p-3 rounded-md transition-transform duration-100 ease-out 
                            hover:-translate-y-1 hover:bg-primary-900 
                            active:scale-95 active:translate-y-0 
                            transform origin-center select-none`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                            className="transition-transform duration-200 ease-in-out group-hover:animate-bounce"
                        />
                        <p className="text-light-1 max-lg:hidden">{link.label}</p>
                    </Link>
                );
                })}
            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton redirectUrl="/sign-in">
                        <div className="group flex cursor-pointer gap-4 p-4 transition-transform hover:scale-105">
                            <Image 
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                                className="transition-transform duration-200 ease-in-out group-hover:animate-bounce"
                            />
                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
}

export default LeftSidebar;
