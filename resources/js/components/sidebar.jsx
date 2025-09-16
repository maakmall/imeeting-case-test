import { Link, usePage } from "@inertiajs/react";
import { Home, File, Users } from "lucide-react";

export default function Sidebar() {
    const menus = [
        { name: "Dashboard", icon: Home, href: "/" },
        { name: "Meeting", icon: File, href: "/bookings" },
        { name: "Unit", icon: Users, href: "/units" },
    ];

    return (
        <aside className="fixed top-17 left-0 h-[calc(100vh-64px)] bg-white shadow-[4px_0px_20px_0px_rgba(106,106,106,0.1)] w-[72px] hover:w-60 group transition-all duration-300 ease-in-out flex flex-col gap-3 px-4 py-5 overflow-hidden">
            {menus.map((menu, idx) => (
                <Link
                    key={idx}
                    href={menu.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-[0.6rem] group/link text-primary hover:bg-primary hover:text-white transition-colors ${
                        isMenuActive(menu.href) && "bg-primary text-white"
                    }`}
                >
                    <span
                        className={`text-primary group-hover/link:text-white ${
                            isMenuActive(menu.href) && "text-white"
                        }`}
                    >
                        <menu.icon className="size-4" />
                    </span>
                    <span className="text-sm tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {menu.name}
                    </span>
                </Link>
            ))}
        </aside>
    );
}

function isMenuActive(href) {
    const { url } = usePage();

    return href === "/" ? url === href : url.startsWith(href);
}
