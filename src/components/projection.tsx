import React from "react";

export type ProjectionProps = {} & React.PropsWithChildren;

const Projection = ({children}: ProjectionProps): React.JSX.Element => (
    <div className="relative [transform-style:preserve-3d]">
        <div className='[transform-style:preserve-3d] [transform:rotateX(0.0turn)] w-fit grid [grid-template-areas:"center"] [&>*]:[grid-area:center] [&>*]:w-fit overflow-visible'>
            <div className="[transform:translate3d(0,0,0rem)] opacity-100 backdrop-opacity-0">
                {children}
            </div>
            <div
                className="[transform:translate3d(0,0,-2.5rem)] opacity-20 backdrop-opacity-0 [&_.glitch_span]:[animation-delay:0.05s] [&_.glitch::before]:[animation-delay:0.05s] [&_.glitch_after]:[animation-delay:0.05s]">
                {children}
            </div>
            <div className="[transform:translate3d(0,0,-5rem)] opacity-15 backdrop-opacity-0 [&_.glitch_span]:[animation-delay:0.1s] [&_.glitch::before]:[animation-delay:0.1s] [&_.glitch_after]:[animation-delay:0.1s]">
                {children}
            </div>
            <div
                className="[transform:translate3d(0,0,-7.5rem)] opacity-10 backdrop-opacity-0 [&_.glitch_span]:[animation-delay:0.15s] [&_.glitch::before]:[animation-delay:0.15s] [&_.glitch_after]:[animation-delay:0.15s]">
                {children}
            </div>
            <div
                className="[transform:translate3d(0,0,-10rem)] opacity-5 backdrop-opacity-0 [&_.glitch_span]:[animation-delay:0.2s] [&_.glitch::before]:[animation-delay:0.2s] [&_.glitch_after]:[animation-delay:0.2s]">
                {children}
            </div>
        </div>
    </div>

)

export default Projection;