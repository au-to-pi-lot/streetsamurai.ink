import React from "react";
import Link from "next/link";
import LibreBarcode128Text from "@/lib/fonts/libre-barcode-128-text";

export type HeaderProps = {} & React.PropsWithChildren

const Header = ({...props}: HeaderProps): React.JSX.Element => (

    <header className="hero-container h-[8rem] w-full [transform-style:preserve-3d] flex items-center justify-between px-4">
        <h1 className={`${LibreBarcode128Text.variable} tracking-tighter whitespace-nowrap text-xl sm:text-3xl font-barcode font-extrabold hero glitch layers border-2 p-2`}
            data-text="Street Samurai Aug Clinic">
            <Link href="/" aria-label="Home">Street Samurai Aug Clinic</Link>
        </h1>

        <nav aria-label="Main Navigation">
            {/* Add navigation items here */}
        </nav>
    </header>

)

export default Header;
