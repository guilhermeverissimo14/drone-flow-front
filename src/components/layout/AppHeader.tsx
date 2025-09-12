import { useAuth } from "@/hooks/useAuth";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  title?: string;
  actionButtonText?: string;
  onActionClick?: () => void;
}

export const AppHeader = ({ title}: AppHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.avatar || ""} alt={user?.name} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-semibold text-muted-foreground">{title || `Bem-vindo, ${user?.name}!`}</h1>
      </div>
    </header>
  );
};
