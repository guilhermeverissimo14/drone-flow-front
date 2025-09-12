import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Users() {
    return (
        <DashboardLayout 
            activeItem="users"
            headerTitle="Gestão de Usuários"
            headerSubtitle="Gerencie usuários e permissões do sistema"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
                </div>
                
            </div>
        </DashboardLayout>
    );
}