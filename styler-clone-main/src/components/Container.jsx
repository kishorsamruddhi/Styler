import { cn } from "@/lib/utils";

export default function Container({ children, className = "" }) {
    return (
        <div className={cn("max-w-screen-xl mx-auto", className)}>{children}</div>
    )
}
