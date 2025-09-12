import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
  showActionButton?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
}

export const DashboardLayout = ({ 
  children, 
  activeItem = "dashboard",
  headerTitle,
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar activeItem={activeItem} />
      <SidebarInset>
        <AppHeader 
          title={headerTitle}
        />
        <main>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
