import { toast } from 'react-toastify';

const warn = (msg) => {
  toast(msg, { type: toast.TYPE.ERROR, autoClose: 3000 });
};

const ToastFactory = {
  warn
};

export default ToastFactory;
