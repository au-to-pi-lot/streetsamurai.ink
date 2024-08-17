import React from "react";
import HazardTape from "@/components/hazard-tape";

export type FooterProps = {}

const Footer = ({...props}: FooterProps): React.JSX.Element => (
    <footer className="h-[8rem] flex flex-col">
        <HazardTape orientation="horizontal" className="w-full h-8 mb-4" />
        <div className="flex-grow">
            {/* Add your footer content here */}
        </div>
    </footer>
)

export default Footer;
