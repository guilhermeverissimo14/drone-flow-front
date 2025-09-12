import { useState } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Aircraft() {

	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [editingUser, setEditingUser] = useState(null);

	const handleNewUser = () => {
		setEditingUser(null);
		setIsSheetOpen(true);
	}

	return (
		<SidebarProvider>
			<AppSidebar activeItem="dashboard" />
			<SidebarInset>
				<AppHeader title="Gerenciamento de Aeronaves" />

				<div className="flex h-16 shrink-0 items-center gap-2  px-4">
					<div className="ml-auto flex items-center gap-3">
						<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
							<Button
								size="sm"
								className="bg-primary hover:bg-primary/90"
								onClick={handleNewUser}
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
									<h1>Aqui vai o formulario de criar e editar Aeronaves</h1>
								</form>

							</SheetContent>
						</Sheet>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}