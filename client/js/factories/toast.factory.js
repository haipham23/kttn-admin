import { toast } from 'react-toastify';

const warn = (msg) => {
  toast(msg, { type: toast.TYPE.ERROR, autoClose: 3000 });
};

const success = (msg) => {
  toast(msg, { type: toast.TYPE.SUCCESS, autoClose: 3000 });
};

const ToastFactory = {
  warn,
  success
};

export default ToastFactory;
