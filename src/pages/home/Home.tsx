import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Home = () => {
	return (
		<DashboardLayout 
			activeItem="dashboard"
			headerTitle="Dashboard"
			headerSubtitle="Visão geral das suas operações"
		>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Home;
