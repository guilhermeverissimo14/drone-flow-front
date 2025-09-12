import { type ColumnDef } from "@tanstack/react-table";
import type { Aircraft } from "@/types/aircraft";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ColumnProps {
	onView: (aircraft: Aircraft) => void;
	onEdit: (aircraft: Aircraft) => void;
    onDelete: (aircraft: Aircraft) => void;
    onToggleStatus: (aircraft: Aircraft) => void;
}

export const createColumns = ({ onView, onEdit, onDelete, onToggleStatus }: ColumnProps): ColumnDef<Aircraft>[] => [
	{
		accessorKey: "registration",
		header: "Prefixo",
		cell: ({ row }: { row: { original: Aircraft } }) => {
			const aircraft = row.original;
			return (
				<div className="font-mono font-medium text-primary">
					{aircraft.registration}
				</div>
			);
		},
	},
	{
		accessorKey: "manufacturer",
		header: "Fabricante",
		cell: ({ row }: { row: { original: Aircraft } }) => {
			const aircraft = row.original;
			return (
				<div className="font-medium">
					{aircraft.manufacturer}
				</div>
			);
		},
	},
	{
		accessorKey: "model",
		header: "Modelo", 
		cell: ({ row }: { row: { original: Aircraft } }) => {
			const aircraft = row.original;
			return (
				<div className="font-medium">
					{aircraft.model}
				</div>
			);
		},
	},
	{
		accessorKey: "year",
		header: "Ano de Fabricação",
		cell: ({ row }: { row: { getValue: (key: string) => unknown } }) => {
			const ano = row.getValue("year") as number;
			const idade = new Date().getFullYear() - ano;
			
			return (
				<div>
					<div className="font-medium">{ano}</div>
					<div className="text-sm text-muted-foreground">
						{idade} {idade === 1 ? 'ano' : 'anos'}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Nome",
		cell: ({ row }: { row: { original: Aircraft } }) => {
			const aircraft = row.original;
			return (
				<div className="font-medium">
					{aircraft.name}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as boolean;
			const user = row.original;
			return (
				<button
					type="button"
					className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
					onClick={() => onToggleStatus(user)}
				>
					<div
						className={`w-2 h-2 rounded-full ${status ? "bg-green-400" : "bg-red-400"}`}
					/>
					<span className="text-lg">{status ? "Ativo" : "Inativo"}</span>
				</button>
			);
		},
	},
    {
		id: "actions",
		header: "Ações",
		cell: ({ row }) => {
			const aircraft = row.original;

			return (
				<TooltipProvider>
					<div className="flex items-center gap-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-500"
									onClick={() => onView(aircraft)}
								>
									<Icon name="eye" size={16} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Visualizar</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-500"
									onClick={() => onEdit(aircraft)}
								>
									<Icon name="edit" size={16} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Editar</p>
							</TooltipContent>
						</Tooltip>
                        <Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-500"
									onClick={() => onDelete(aircraft)}
								>
									<Icon name="delete" size={16} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Excluir</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			);
		},
	},
];
