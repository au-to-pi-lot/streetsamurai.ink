import React from 'react';

export interface HazardTapeProps {
    className?: string;
}

const HazardTape: React.FC<HazardTapeProps> = ({ className = '' }) => {
    return (
        <div className={`hazard-tape ${className}`}>
            <div className="hazard-tape-inner"></div>
        </div>
    );
};

export default HazardTape;
