
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SignIn from "@/pages/auth/LoginPage";
import Home from "@/pages/home/Home";
import Dashboard from "@/components/layout/DashBoard";
import PrivateRoute from "./PrivateRoutes";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import Products from "@/pages/products/Products";
import Aircraft from "@/pages/aircraft/Aircraft";
import Users from "@/pages/users/Users";

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
				<Route
					path="/forgot-password"
					element={
						isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />
					}
				/>

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
					<Route path="products" element={<Products />} />
					<Route path="aircrafts" element={<Aircraft />} />
					<Route path="users" element={<Users />} />
				</Route>

				{/* Rota de fallback */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;