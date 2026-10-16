import React from 'react';

interface BrandLogoProps {
  className?: string;
  altText?: string;
  variant?: string;
  type?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  altText = 'Royal Raymi — The Scent of VRAEM',
}) => {
  return (
    <img
      src="/assets/brand/Royal-Raymi-logo-cacao-profundo.png"
      alt={altText}
      className={`h-10 sm:h-12 w-auto object-contain transition-transform duration-200 hover:opacity-90 ${className}`}
      width={240}
      height={81}
    />
  );
};

export default BrandLogo;
