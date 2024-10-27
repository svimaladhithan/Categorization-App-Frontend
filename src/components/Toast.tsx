import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer 
      closeOnClick 
      draggable 
    />
  );
};

export default Toast;