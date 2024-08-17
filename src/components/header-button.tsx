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
        className={`text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium button-hover-effect ${className}`}
        onClick={onClick}
    >
        {label}
    </Link>
)

export default HeaderButton;
