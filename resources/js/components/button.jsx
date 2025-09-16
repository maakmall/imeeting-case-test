import { Link } from "@inertiajs/react";

export default function Button({ children, className = "", href, ...props }) {
    const baseClass =
        "text-white bg-primary py-3 px-4 font-semibold text-sm tracking-wider rounded-lg cursor-pointer disabled:bg-primary/80 hover:bg-primary-hover transition-colors";

    if (href) {
        return (
            <Link
                href={href}
                className={`${baseClass} ${className}`}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button className={`${baseClass} ${className}`} {...props}>
            {children}
        </button>
    );
}
