import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Products() {
    return (
        <DashboardLayout 
            activeItem="products"
            headerTitle="Gestão de Produtos"
            headerSubtitle="Gerencie seu catálogo de produtos e serviços"
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
                </div>
            </div>
        </DashboardLayout>
    );
}