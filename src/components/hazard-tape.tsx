import React from 'react';

export interface HazardTapeProps {
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    reverse?: boolean;
}

const HazardTape: React.FC<HazardTapeProps> = ({ className = '', orientation = 'horizontal', reverse = false }) => {
    const orientationClass = orientation === 'vertical' ? 'hazard-tape-vertical' : 'hazard-tape-horizontal';
    const reverseClass = reverse ? 'hazard-tape-reverse' : '';
    
    return (
        <div className={`hazard-tape ${orientationClass} ${reverseClass} ${className}`}>
            <div className="hazard-tape-inner"></div>
        </div>
    );
};

export default HazardTape;
