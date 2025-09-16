import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
    return (
        <div className="font-normal text-sm flex gap-2 items-center">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={`${
                                index === items.length - 1
                                    ? "text-primary font-medium"
                                    : "text-[#9E9E9E] hover:text-primary"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className={
                                index === items.length - 1
                                    ? "text-primary font-medium"
                                    : "text-[#9E9E9E]"
                            }
                        >
                            {item.label}
                        </span>
                    )}

                    {index < items.length - 1 && (
                        <ChevronRight className="size-4 text-primary" />
                    )}
                </div>
            ))}
        </div>
    );
}
