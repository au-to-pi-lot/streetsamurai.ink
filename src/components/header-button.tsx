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
        className={`text-white px-3 py-2 border-2 border-white text-sm font-medium button-hover-effect ${className}`}
        onClick={onClick}
    >
        <span>{label}</span>
    </Link>
)

export default HeaderButton;
