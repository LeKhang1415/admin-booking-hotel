import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick.ts";

type MenusContextType = {
    openId: string;
    position: { x: number; y: number } | null;
    open: (id: string) => void;
    close: () => void;
    setPosition: (pos: { x: number; y: number }) => void;
};

const MenusContext = createContext<MenusContextType | null>(null);

function Menus({ children }: { children: ReactNode }) {
    const [openId, setOpenId] = useState<string>("");
    const [position, setPosition] = useState<{ x: number; y: number } | null>(
        null
    );

    const close = () => setOpenId("");
    const open = (id: string) => setOpenId(id);

    // đóng menu khi scroll hoặc resize
    useEffect(() => {
        function handleScroll() {
            if (openId) {
                close();
            }
        }

        window.addEventListener("scroll", handleScroll, true); // true để bắt cả scroll con
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleScroll);
        };
    }, [openId]);

    return (
        <MenusContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Menu({ children }: { children: ReactNode }) {
    return <div className="flex items-center justify-start">{children}</div>;
}

function Toggle({ id }: { id: string }) {
    const ctx = useContext(MenusContext);
    if (!ctx) throw new Error("Toggle must be used inside Menus");

    const { openId, close, open, setPosition } = ctx;

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        if (openId === "" || openId !== id) {
            open(id);
        } else {
            close();
        }
    }

    return (
        <button
            onClick={handleClick}
            className="p-1 rounded-sm hover:bg-elevated transition-colors"
            aria-expanded={ctx?.openId === id}
        >
            <HiDotsHorizontal className="w-6 h-6 text-muted-2" />
        </button>
    );
}

function List({ id, children }: { id: string; children: ReactNode }) {
    const ctx = useContext(MenusContext);
    if (!ctx) throw new Error("List must be used inside Menus");

    const { openId, position, close } = ctx;
    const ref = useOutsideClick<HTMLUListElement>(close, false);

    if (openId !== id || !position) return null;

    return createPortal(
        <ul
            ref={ref}
            className="fixed bg-card-bg text-text shadow-card rounded-md border border-border min-w-[160px] overflow-hidden"
            style={{ right: position.x, top: position.y, zIndex: 1100 }}
        >
            {children}
        </ul>,
        document.body
    );
}

function Button({
    children,
    icon,
    onClick,
}: {
    children: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
}) {
    const ctx = useContext(MenusContext);
    if (!ctx) throw new Error("Button must be used inside Menus");

    const { close } = ctx;

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li>
            <button
                onClick={handleClick}
                className="w-full rounded-md text-left px-4 py-2 text-sm transition-colors flex items-center gap-3 hover:bg-elevated"
                type="button"
            >
                {icon && (
                    <span className="w-4 h-4 text-muted-2 flex-shrink-0">
                        {icon}
                    </span>
                )}
                <span className="text-text">{children}</span>
            </button>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
