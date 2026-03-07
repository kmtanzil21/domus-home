import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <Image 
            src="/assets/domus.png" 
            alt="Domus Logo" 
            width={80} 
            height={50}
            className="object-contain"
            style={{ maxHeight: '60px', width: 'auto' }}
        />
    );
};

export default Logo;