import React from 'react';

export interface HazardTapeProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
}

const HazardTape: React.FC<HazardTapeProps> = ({ className = '', orientation = 'horizontal' }) => {
    const orientationClass = orientation === 'vertical' ? 'hazard-tape-vertical' : 'hazard-tape-horizontal';
    
    return (
        <div className={`hazard-tape ${orientationClass} ${className}`}>
            <div className="hazard-tape-inner"></div>
        </div>
    );
};

export default HazardTape;
