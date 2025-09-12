
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import SignIn from "@/pages/auth/LoginPage";
import Home from "@/pages/home/Home";
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

				<Route
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				/>
				<Route
					path="/products"
					element={
						<PrivateRoute>
							<Products />
						</PrivateRoute>
					}
				/>
				<Route
					path="/aircrafts"
					element={
						<PrivateRoute>
							<Aircraft />
						</PrivateRoute>
					}
				/>
				<Route
					path="/users"
					element={
						<PrivateRoute>
							<Users />
						</PrivateRoute>
					}
				/>

				{/* Rota de fallback */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;