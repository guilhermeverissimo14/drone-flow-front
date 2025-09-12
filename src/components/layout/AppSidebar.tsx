import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/ui/icon";

interface AppSidebarProps {
	activeItem?: string;
}

interface MenuItem {
    title: string;
    icon: React.ReactElement;
    path: string;
    key: string;
    showOnlyForSuperAdmin?: boolean; 
}

export const AppSidebar = ({ activeItem }: AppSidebarProps) => {
	const { logout, isSuperAdmin } = useAuth();
	const navigate = useNavigate();

	const adminMenuItems: MenuItem[] = [
		{
			title: "Dashboard",
			icon: <Icon name="dashboard" size={18} />,
			path: "/",
			key: "dashboard",
		},
		{
			title: "Usuários",
			icon: <Icon name="users" size={18} />,
			path: "/users",
			key: "users",
		},
		{
			title: "Produtos",
			icon: <Icon name="package" size={18} />,
			path: "/products",
			key: "products",
		},
		{
			title: "Aeronaves",
			icon: <Icon name="drone" size={18} />,
			path: "/aircrafts",
			key: "aircraft",
		}
		
	];

	const prospectorMenuItems = [
		{
			title: "Dashboard",
			icon: <Icon name="dashboard" size={18} />,
			path: "/",
			key: "dashboard",
		},
		{
			title: "Minhas Empresas",
			icon: <Icon name="building" size={18} />,
			path: "/my-companies",
			key: "my-companies",
		},
		{
			title: "Comissões",
			icon: <Icon name="dollar" size={18} />,
			path: "/commissions",
			key: "commissions",
		},
	];

	const menuItems = isSuperAdmin
		? adminMenuItems.filter(
				(item) => !item.showOnlyForSuperAdmin || isSuperAdmin,
			)
		: prospectorMenuItems;

	return (
		<Sidebar variant="inset">
			<SidebarHeader>
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
						<Icon name="activity" size={20} className="text-primary" />
					</div>
					<div className="flex flex-col">
						<span className="text-base font-semibold text-sidebar-foreground">
							Drone Flow
						</span>
						<span className="text-sm text-sidebar-foreground/70">
							Administrativo
						</span>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-sm font-medium">
						Menu Principal
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.key}>
									<SidebarMenuButton
										isActive={activeItem === item.key}
										className="cursor-pointer text-base py-3"
										onClick={() => navigate(item.path)}
									>
										{item.icon}
										<span className="text-base">{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton onClick={logout} className="py-3">
							<Icon name="logout" size={20} />
							<span className="cursor-pointer text-base">Sair</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
