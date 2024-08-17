import React from "react";
import Link from "next/link";

export type HeaderButtonProps = {
    href: string;
    label: string;
    className?: string;
    onClick?: () => void;
}

const HeaderButton = ({ href, label, className = "", onClick }: HeaderButtonProps): React.JSX.Element => (
    <Link 
        href={href} 
        className={`px-3 py-2 border-2 border-white text-sm font-medium button-hover-effect shadow-[0_0_10px_rgba(255,255,255,0.5)] ${className}`}
        onClick={onClick}
    >
        <span className="relative z-10">{label}</span>
        <div className="absolute inset-0 shadow-[inset_0_0_5px_rgba(255,255,255,0.5)]"></div>
    </Link>
)

export default HeaderButton;
