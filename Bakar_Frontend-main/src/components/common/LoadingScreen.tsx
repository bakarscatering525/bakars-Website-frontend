import React from 'react';
import { Loader2 } from 'lucide-react';

type LoadingScreenVariant = 'page' | 'section';

interface LoadingScreenProps {
  message?: string;
  variant?: LoadingScreenVariant;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading, please wait...',
  variant = 'page',
}) => {
  const wrapperClasses =
    variant === 'page'
      ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm px-4'
      : 'w-full py-12 flex flex-col items-center justify-center';

  return (
    <div className={wrapperClasses}>
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600 text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
