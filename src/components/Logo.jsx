import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <Image src="/assets/domus.png" alt="Domus Logo" width={100} height={50} />
        </div>
    );
};

export default Logo;