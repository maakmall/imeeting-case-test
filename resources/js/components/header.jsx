import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const page = usePage();
    const { auth, name } = page.props;

    return (
        <header className="fixed w-full bg-gradient-to-r from-[#18A2BA] to-[#296377] h-17 flex items-center justify-between px-6 shadow">
            <div className="flex items-center gap-5">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-13 object-contain"
                />
                <h1 className="text-white font-bold text-md">{name}</h1>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-white hover:bg-dark/30 transition rounded-lg p-3">
                    <Bell size={16} />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 focus:outline-none cursor-pointer"
                    >
                        <img
                            src={`https://ui-avatars.com/api?name=${auth.user.name}`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-white text-sm font-semibold">
                            {auth.user.name}
                        </span>
                        <ChevronDown
                            className={`size-4 text-white transition-transform ${
                                open ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md overflow-hidden">
                            <Link
                                href="/logout"
                                method="delete"
                                as="button"
                                className="w-full text-left px-4 py-2 text-sm text-dark hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
