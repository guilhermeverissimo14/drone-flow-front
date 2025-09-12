import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { AircraftCard } from "./aircraftCard";
import type { Aircraft, Pagination } from "@/types/aircraft";

interface AircraftCardListProps {
	data: Aircraft[];
	pagination?: Pagination;
	isLoading?: boolean;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
	onEdit: (aircraft: Aircraft) => void;
    onView: (aircraft: Aircraft) => void;
	onDelete: (aircraft: Aircraft) => void;
	onToggleStatus: (aircraft: Aircraft) => void;
}

export function AircraftCardList({
	data,
	pagination,
	isLoading = false,
	onPageChange,
	onPageSizeChange,
    onView,
	onEdit,
	onDelete,
	onToggleStatus,
}: AircraftCardListProps) {
	const handlePageChange = (page: number) => {
		if (onPageChange && page >= 1 && page <= (pagination?.totalPages ?? 1)) {
			onPageChange(page);
		}
	};

	const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newPageSize = Number.parseInt(event.target.value);
		if (onPageSizeChange) {
			onPageSizeChange(newPageSize);
		}
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="h-32 w-full rounded-lg" />
				))}
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div className="text-center py-8">
				<Icon name="box" size={48} className="mx-auto text-muted-foreground mb-4" />
				<p className="text-muted-foreground text-lg">
					Nenhuma aeronave encontrada
				</p>
				<p className="text-muted-foreground text-sm">
					Comece cadastrando sua primeira aeronave
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Cards */}
			<div className="space-y-4">
				{data.map((aircraft) => (
					<AircraftCard
						key={aircraft.id}
						aircraft={aircraft}
						onEdit={onEdit}
						onDelete={onDelete}
						onToggleStatus={onToggleStatus}
                        onView={onView}
					/>
				))}
			</div>

			{pagination && (
				<div className="border-t pt-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<p className="text-sm font-medium text-muted-foreground">
								Linhas
							</p>
							<select
								className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
								value={pagination.limit}
								onChange={handlePageSizeChange}
							>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>

						

						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(1)}
								disabled={!pagination.hasPrev}
								className="h-8 w-8 p-0"
							>
								<span className="sr-only">Ir para primeira página</span>
								<Icon name="chevronLeft" size={16} />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(pagination.page - 1)}
								disabled={!pagination.hasPrev}
								className="h-8 w-8 p-0"
							>
								<span className="sr-only">Ir para página anterior</span>
								<Icon name="chevronLeft" size={16} />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(pagination.page + 1)}
								disabled={!pagination.hasNext}
								className="h-8 w-8 p-0"
							>
								<span className="sr-only">Ir para próxima página</span>
								<Icon name="chevronRight" size={16} />
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handlePageChange(pagination.totalPages)}
								disabled={!pagination.hasNext}
								className="h-8 w-8 p-0"
							>
								<span className="sr-only">Ir para última página</span>
								<Icon name="chevronRight" size={16} />
							</Button>
						</div>
					</div>

                  <div className="text-center mt-4">
						<p className="text-sm text-muted-foreground">
								Página {pagination.page} de {pagination.totalPages}
							</p>
					</div>

					<div className="mt-2 text-center">
						<p className="text-sm text-muted-foreground">
							Mostrando {((pagination.page - 1) * pagination.limit) + 1} até{" "}
							{Math.min(pagination.page * pagination.limit, pagination.total)} de{" "}
							{pagination.total} aeronaves
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
