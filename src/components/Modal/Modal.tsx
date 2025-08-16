import {
    createContext,
    useState,
    useEffect,
    cloneElement,
    useContext,
} from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

type ModalContextType = {
    open: (name: string) => void;
    close: () => void;
    modalName: string;
};

const ModalContext = createContext<ModalContextType>(null!);

export default function Modal({ children }: { children: React.ReactNode }) {
    const [modalName, setModalName] = useState("");

    const open = (name: string) => setModalName(name);
    const close = () => setModalName("");

    // Đóng khi bấm ESC
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.code === "Escape") close();
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, []);

    return (
        <ModalContext.Provider value={{ open, close, modalName }}>
            {children}
        </ModalContext.Provider>
    );
}

// Component để mở modal
function Open({
    children,
    opens,
}: {
    children: React.ReactElement<{ onClick?: () => void }>;
    opens: string;
}) {
    const { open } = useContext(ModalContext);
    return cloneElement(children, {
        onClick: () => open(opens),
    });
}

// Nội dung modal
function Content({
    name,
    children,
}: {
    name: string;
    children: React.ReactElement<{ close?: () => void }>;
}) {
    const { modalName, close } = useContext(ModalContext);

    if (modalName !== name) return null;

    return createPortal(
        <div className="fixed inset-0 w-full h-screen bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center">
            <div className="relative bg-[#1e1e1e] text-gray-200 rounded-lg shadow-2xl min-w-[500px] overflow-hidden">
                {cloneElement(children, { close })}
            </div>
        </div>,
        document.body
    );
}

// Header
function Header({ children }: { children: React.ReactNode }) {
    const { close } = useContext(ModalContext);
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold">{children}</h3>
            <button
                onClick={close}
                className="text-gray-400 hover:text-gray-200 transition-colors"
            >
                <IoMdClose className="text-2xl" />
            </button>
        </div>
    );
}

// Body
function Body({ children }: { children: React.ReactNode }) {
    return <div className="px-6 py-4">{children}</div>;
}

// Footer
function Footer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-700">
            {children}
        </div>
    );
}

Modal.Open = Open;
Modal.Content = Content;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
