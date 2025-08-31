import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


const Home = () => {
	
	return (
		<SidebarProvider>
			<AppSidebar activeItem="dashboard" />
			<SidebarInset>
				<AppHeader showActionButton={true} />

				<h1>Home</h1>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Home;
