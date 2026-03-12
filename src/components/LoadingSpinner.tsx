import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  label = 'Chargement...',
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center" role="status">
      <div
        className={`animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 ${sizeClasses[size]}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};
