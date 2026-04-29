import React from 'react';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
  hideTextOnMobile?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  hideTextOnMobile = false,
}) => {
  const logoHeight = {
    sm: 'h-12 sm:h-16', // increased from 10->12 and 12->16
    md: 'h-16 sm:h-20', // increased from 12->16 and 14->20
    lg: 'h-20 sm:h-24', // increased from 15->20 and 16->24
  };

  const textSize = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };

  // Keep variant prop for compatibility in case future themed logos are added
  const opacityClass = variant === 'white' ? 'opacity-95' : 'opacity-100';
  const colorClass = variant === 'white' ? 'text-white' : 'text-primary';
  const textVisibility = hideTextOnMobile ? 'hidden sm:inline-block' : '';

  return (
    <div
      className={`flex items-center gap-0 font-heading font-bold leading-tight -ml-2 sm:-ml-3 ${colorClass}`}
    >
      <img
        src="/images/placeholders/logo2.png"
        alt="Bakar's Food & Catering logo"
        className={`w-auto object-contain ${logoHeight[size]} ${opacityClass}`}
      />
      <span
        className={`${textSize[size]} whitespace-nowrap -ml-0.5 sm:-ml-1 ${textVisibility}`}
      >
        Bakar's Food &amp; Catering
      </span>
    </div>
  );
};

export default Logo;
