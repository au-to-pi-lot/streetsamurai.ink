import React from "react";
import Link from "next/link";

export type HeaderProps = {} & React.PropsWithChildren

const Header = ({...props}: HeaderProps): React.JSX.Element => (

    <header className="hero-container h-[8rem] w-full [transform-style:preserve-3d] flex items-center justify-center">
        <div className="[transform-style:preserve-3d] grid">
                <h1 className="tracking-tighter whitespace-nowrap text-xl sm:text-3xl font-mono font-extrabold hero glitch layers border-2 p-2"
                    data-text="Street Samurai Aug Clinic"><Link href="/" className=""><span>Street Samurai Aug Clinic</span></Link>
                </h1>
        </div>

        <nav>

        </nav>
    </header>

)

export default Header;