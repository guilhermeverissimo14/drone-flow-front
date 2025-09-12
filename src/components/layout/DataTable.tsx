import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pagination } from "@/types/aircraft";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: Pagination;
	isLoading?: boolean;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
	isLoading = false,
	onPageChange,
	onPageSizeChange,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		pageCount: pagination?.totalPages ?? 0,
		state: {
			pagination: {
				pageIndex: (pagination?.page ?? 1) - 1, 
				pageSize: pagination?.limit ?? 10,
			},
		},
	});

	const handlePageChange = (newPage: number) => {
		if (onPageChange) {
			onPageChange(newPage);
		}
	};

	const handlePageSizeChange = (newPageSize: number) => {
		if (onPageSizeChange) {
			onPageSizeChange(newPageSize);
		}
	};

	return (
		<div className="space-y-4">
			<div className="rounded-3xl border-none bg-card shadow-sm">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							Array.from({ length: 5 }).map((_, index) => (
								<TableRow key={index.toString()}>
									{columns.map((_, colIndex) => (
										<TableCell key={colIndex.toString()}>
											<Skeleton className="h-4 w-full" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="text-primary-foreground text-lg hover:bg-primary/10"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center text-primary-foreground text-lg"
								>
									Nenhum resultado encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between px-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{pagination && (
						<span>
							Mostrando {((pagination.page - 1) * pagination.limit) + 1} até {' '}
							{Math.min(pagination.page * pagination.limit, pagination.total)} de {' '}
							{pagination.total} resultados
						</span>
					)}
				</div>
				<div className="flex items-center space-x-6 lg:space-x-8">
					<div className="flex items-center space-x-2 text-muted-foreground">
						<p className="text-sm ">Linhas por página</p>
						<select
							value={pagination?.limit ?? 10}
							onChange={(e) => {
								handlePageSizeChange(Number(e.target.value));
							}}
							className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</div>
					<div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
						<span>Página {pagination?.page ?? 1} de {pagination?.totalPages ?? 1}</span>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => handlePageChange(1)}
							disabled={!pagination?.hasPrev}
						>
							<span className="sr-only">Ir para primeira página</span>
							<Icon name="chevronLeft" size={16} />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => handlePageChange((pagination?.page ?? 1) - 1)}
							disabled={!pagination?.hasPrev}
						>
							<span className="sr-only">Ir para página anterior</span>
							<Icon name="chevronLeft" size={16} />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => handlePageChange((pagination?.page ?? 1) + 1)}
							disabled={!pagination?.hasNext}
						>
							<span className="sr-only">Ir para próxima página</span>
							<Icon name="chevronRight" size={16} />
						</Button>
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => handlePageChange(pagination?.totalPages ?? 1)}
							disabled={!pagination?.hasNext}
						>
							<span className="sr-only">Ir para última página</span>
							<Icon name="chevronRight" size={16} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
