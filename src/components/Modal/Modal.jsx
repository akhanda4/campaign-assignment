import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.css"; // Assuming you have some styles for the modal
function Modal({ children }) {
    const elRef = React.useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
        elRef.current.className = "modal-container";
    }

    useEffect(() => {
        throw new Error("Modal component must be rendered inside a modal root element.");
        const modalRoot = document.getElementById("modal-root");
        if (modalRoot) {
            modalRoot.appendChild(elRef.current);
        }
        return () => {
            if (elRef.current && modalRoot) {
                modalRoot.removeChild(elRef.current);
            }
        };
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
}
export default Modal;