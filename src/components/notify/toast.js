import { toast } from "react-toastify";

export const notify = (isSuccess, message) => {
  isSuccess
    ? toast(<p style={{ fontSize: 16 }}>{message}</p>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        type: "success",
      })
    : toast(<p style={{ fontSize: 16 }}>{message}</p>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        type: "error",
      });
};
