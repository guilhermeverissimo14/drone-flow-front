import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse rounded-md",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
