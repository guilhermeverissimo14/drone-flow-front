import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { Aircraft } from "@/types/aircraft";

interface AircraftCardProps {
	aircraft: Aircraft;
	onEdit: (aircraft: Aircraft) => void;
	onDelete: (aircraft: Aircraft) => void;
	onToggleStatus: (aircraft: Aircraft) => void;
}

export const AircraftCard = ({
	aircraft,
	onEdit,
	onDelete,
	onToggleStatus,
}: AircraftCardProps) => {
	return (
		<div className="p-4 border rounded-lg bg-card shadow-sm">
			<div className="flex items-start justify-between">
				<div className="space-y-2 flex-1">
					<div className="flex items-center gap-2">
						<h3 className="font-semibold">{aircraft.name}</h3>
						<button
							type="button"
							className="hover:opacity-70 transition-opacity"
							onClick={() => onToggleStatus(aircraft)}
						>
							<Badge variant={aircraft.active ? "default" : "secondary"}>
								{aircraft.active ? "Ativo" : "Inativo"}
							</Badge>
						</button>
					</div>
					<p className="text-sm text-muted-foreground">
						{aircraft.manufacturer} {aircraft.model}
					</p>
					<p className="text-sm text-muted-foreground">
						Registro: {aircraft.registration}
					</p>
					<p className="text-sm text-muted-foreground">
						Série: {aircraft.serialNumber}
					</p>
					<p className="text-sm text-muted-foreground">
						Ano: {aircraft.year}
					</p>
					<Badge 
						variant={aircraft.status === "DISPONIVEL" ? "default" : 
								aircraft.status === "MANUTENCAO" ? "destructive" : "secondary"}
						className="text-xs"
					>
						{aircraft.status}
					</Badge>
				</div>
				<div className="flex gap-2">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0"
						onClick={() => onEdit(aircraft)}
					>
						<Icon name="settings" size={16} />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-destructive hover:text-destructive"
						onClick={() => onDelete(aircraft)}
					>
						<Icon name="delete" size={16} />
					</Button>
				</div>
			</div>
		</div>
	);
};