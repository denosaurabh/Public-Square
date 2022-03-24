import { ToastContainer as Toastify } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { styled } from "@/stitches.config";

export const ToastContainer = () => {
  return (
    <StyledToastify
      position="top-right"
      autoClose={3000}
      newestOnTop
      // limit={1}
    />
  );
};

const StyledToastify = styled(Toastify, {
  ".Toastify__toast": {
    minHeight: 48,
    borderRadius: "10px",

    backgroundColor: "$grey200",
    color: "$grey600",
  },
  ".Toastify__toast-body": {
    fontFamily: "$main",
    fontWeight: "500",
    fontSize: "1.5rem",
  },
});
