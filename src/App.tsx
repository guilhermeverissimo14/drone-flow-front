import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRoutes from './routes/PrivateRoutes';

function App() {
return (
    <>
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
    </>
)
}

export default App;
