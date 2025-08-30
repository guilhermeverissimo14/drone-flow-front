import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRoutes from './routes/PrivateRoutes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
      />
    </AuthProvider>
)
}

export default App;
