import React from "react";
import Link from "next/link";

export type HeaderButtonProps = {
    href: string;
    label: string;
}

const HeaderButton = ({ href, label }: HeaderButtonProps): React.JSX.Element => (
    <Link href={href} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
        {label}
    </Link>
)

export default HeaderButton;
