
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SignIn from "@/pages/auth/LoginPage";
import Home from "@/pages/home/Home";
import Dashboard from "@/components/layout/DashBoard";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => {
	const { isAuthenticated } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{/* Rotas públicas */}
				<Route
					path="/login"
					element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
				/>
				{/* <Route
					path="/forgot-password"
					element={
						isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />
					}
				/> */}

				{/* Rotas privadas */}
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route index element={<Home />} />
					{/* <Route path="users" element={<Users />} />
					<Route path="partners" element={<Prospectors />} />
					<Route path="enterprises" element={<Enterprises />} />
					<Route path="/enterprises/new" element={<EnterpriseForm />} />
					<Route path="/enterprises/edit/:id" element={<EnterpriseForm />} />
					<Route path="/plans" element={<Plans />} />
					<Route path="reports" element={<Reports />} /> */}
				</Route>

				{/* Rota de fallback */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;