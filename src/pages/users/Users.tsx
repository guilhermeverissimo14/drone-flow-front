import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Users() {
    return (
        <SidebarProvider>
			<AppSidebar activeItem="dashboard" />
			<SidebarInset>
				<AppHeader title="Gerenciamento de Usuários" />

				<h1>Usuários</h1>
			</SidebarInset>
		</SidebarProvider>
    );
}