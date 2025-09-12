import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getAircraft } from "@/services/aircraft";
import { DataTable } from "@/components/layout/DataTable";
import { createColumns } from "@/components/features/aircrafts/column";
import { useIsMobile } from "@/hooks/use-mobile";
import { AircraftCardList } from "@/components/features/aircrafts/AircraftCardList";
import type { Aircraft } from "@/types/aircraft";
import { Dialog } from "@/components/ui/Dialog";

export default function Aircraft() {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<Aircraft | null>(null);
	const [userToToggleStatus, setUserToToggleStatus] = useState<Aircraft | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const isMobile = useIsMobile();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["aircraft", currentPage, pageSize],
		queryFn: () => getAircraft(currentPage, pageSize),
	});

	const handleNewAircraft = () => {
		setEditingUser(null);
		setIsSheetOpen(true);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handlePageSizeChange = (newPageSize: number) => {
		setPageSize(newPageSize);
		setCurrentPage(1);
	};

	const handleEditAircraft = (aircraft: Aircraft) => {
		setEditingUser(aircraft);
		setIsSheetOpen(true);
	}

	const handleDeleteAircraft = (aircraft: Aircraft) => {
		// Implement delete functionality here
	}

	const handleToggleAircraftStatus = (aircraft: Aircraft) => {
		setUserToToggleStatus(aircraft);
		setIsStatusDialogOpen(true);
	}

	const confirmToggleStatus = () => {
		// if (userToToggleStatus) {
		// 	toggleStatusMutation.mutate({ id: userToToggleStatus.id });
		// }
		setIsStatusDialogOpen(false);
		setUserToToggleStatus(null);
	};

	const columns = createColumns({
		onView: (aircraft) => { },
		onEdit: (aircraft) => handleEditAircraft(aircraft),
		onDelete: (aircraft) => handleDeleteAircraft(aircraft),
		onToggleStatus: (aircraft) => handleToggleAircraftStatus(aircraft),
	});

	return (
		<DashboardLayout
			activeItem="aircraft"
			headerTitle="Gestão de Aeronaves"
			headerSubtitle="Gerencie sua frota de drones e aeronaves"
		>
			<div className="flex h-16 shrink-0 items-center gap-2 px-4">
				<div className="ml-auto flex items-center gap-3">
					<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
						<Button
							size="sm"
							className="bg-primary hover:bg-primary/90"
							onClick={handleNewAircraft}
						>
							<Icon name="plus" size={20} className="mr-2 text-white" />
							<span className="text-white font-bold text-md">
								Nova Aeronave
							</span>
						</Button>
						<SheetContent className="min-w-[400px] sm:min-w-[540px] p-4">
							<SheetHeader>
								<SheetTitle className="text-xl">
									{editingUser ? "Editar Aeronave" : "Cadastrar Nova Aeronave"}
								</SheetTitle>
								<SheetDescription>
									{editingUser
										? "Atualize os dados da aeronave."
										: "Preencha os dados para cadastrar uma nova aeronave."}
								</SheetDescription>
							</SheetHeader>
							<form>
								<h1>Aqui vai o formulário de criar e editar Aeronaves</h1>
							</form>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			<div className="flex flex-1 flex-col gap-6 p-6">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight text-primary-foreground">
						Lista de Aeronaves
					</h2>
					<p className="text-muted-foreground">
						Gerencie todas as aeronaves cadastradas no sistema
					</p>
				</div>

				<div className="space-y-4">


					{isMobile ? (
						<AircraftCardList
							data={data?.data ?? []}
							pagination={data?.pagination}
							isLoading={isLoading}
							onPageChange={handlePageChange}
							onPageSizeChange={handlePageSizeChange}
							onEdit={handleEditAircraft}
							onDelete={handleDeleteAircraft}
							onToggleStatus={handleToggleAircraftStatus}
						/>
					) : (
						<DataTable
							columns={columns}
							data={data?.data ?? []}
							pagination={data?.pagination}
							isLoading={isLoading}
							onPageChange={handlePageChange}
							onPageSizeChange={handlePageSizeChange}
						/>
					)}
				</div>
			</div>

			<Dialog
				title={
					userToToggleStatus?.active ? "Desativar a Aeronave" : "Ativar Aeronave"
				}
				description={`Tem certeza que deseja ${userToToggleStatus?.active ? "desativar" : "ativar"} a aeronave "${userToToggleStatus?.name}"?`}
				isOpen={isStatusDialogOpen}
				onClose={() => setIsStatusDialogOpen(false)}
				onConfirm={confirmToggleStatus}
				confirmText={userToToggleStatus?.active ? "Desativar" : "Ativar"}
				cancelText="Cancelar"
				variant="attention"
				showIcon={true}
			/>
		</DashboardLayout>
	);
}