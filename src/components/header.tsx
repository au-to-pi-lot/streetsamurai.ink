import React from "react";
import Link from "next/link";
import LibreBarcode128Text from "@/lib/fonts/libre-barcode-128-text";
import HeaderButton from "./header-button";
import HazardTape from "@/components/hazard-tape";
import Nav from "./nav";

export type HeaderProps = {} & React.PropsWithChildren

const Header = (): React.JSX.Element => (
    <header className="hero-container h-[10rem] w-full [transform-style:preserve-3d] flex flex-col items-center justify-evenly px-4">
        <div className="w-full h-full flex items-center justify-between">
            <h1 className={`${LibreBarcode128Text.variable} tracking-tighter whitespace-nowrap text-header sm:text-header-lg font-barcode hero glitch layers border-2 p-2`}
                data-text="Street Samurai Aug Clinic">
                <Link href="/" aria-label="Home">Street Samurai Aug Clinic</Link>
            </h1>

            <Nav>
                <HeaderButton href="/augs" label="Augs" />
                <HeaderButton href="/about" label="About" />
                <HeaderButton href="/donate" label="Donate" />
            </Nav>
        </div>
        <HazardTape orientation="horizontal" className="w-full h-8 mt-4" />
    </header>
)

export default Header;
