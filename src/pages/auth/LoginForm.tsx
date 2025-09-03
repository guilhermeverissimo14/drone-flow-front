import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignInForm() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const success = await login(email, password);

			if (success) {
				toast.success("Login realizado com sucesso.");
			} else {
				toast.error("Erro ao fazer login");
			}
		} catch (error) {
			console.error("Erro no login:", error);
			toast.error("Erro ao fazer login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Input
						id="email"
						type="email"
						label="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Digite seu e-mail"
						required
						disabled={isLoading}
						className="h-12 mt-1"
						leftIcon="mail"
					/>
				</div>

				<div className="space-y-2">
					<Input
						id="password"
						type="password"
						label="Senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Digite sua senha"
						required
						disabled={isLoading}
						className="h-12 mt-1"
						leftIcon="lock"
						showPasswordToggle={true}
					/>
				</div>

				<Button
					type="submit"
					className="w-full h-12 mt-6 cursor-pointer bg-primary"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								aria-label="Loading indicator"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Entrando...
						</>
					) : (
						"Entrar"
					)}
				</Button>
			</form>
		</>
	);
}