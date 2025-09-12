import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Products() {
    return (
        <SidebarProvider>
			<AppSidebar activeItem="dashboard" />
			<SidebarInset>
				<AppHeader title="Gerenciamento de Produtos" />

				<h1>Produtos</h1>
			</SidebarInset>
		</SidebarProvider>
    );
}