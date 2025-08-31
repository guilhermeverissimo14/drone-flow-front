import { Outlet } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";
import { Icon } from "@/components/ui/icon";
import { useTheme } from "@/hooks/useTheme";

const Dashboard = () => {
	//const { user } = useAuth();
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b border-border bg-gradient-to-br from-primary/20 to-primary/5">
				<div className="flex h-16 items-center px-6">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
							<svg
								className="w-4 h-4 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
								/>
							</svg>
						</div>
						<h1 className="text-lg font-semibold text-foreground">
							Drone Flow Admin
						</h1>
					</div>

					<div className="ml-auto flex items-center gap-2">
						<button
							type="button"
							onClick={toggleTheme}
							className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center cursor-pointer hover:bg-secondary/30 transition-colors"
						>
							<Icon
								name={theme === "dark" ? "sun" : "moon"}
								library="lucide"
								size={20}
								className="text-foreground"
							/>
						</button>
					</div>
				</div>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Dashboard;
