import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, isLoading, ...props }, ref) => {
    const baseClasses = 'modern-btn inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'modern-btn-primary',
      outline: 'modern-btn-outline',
      ghost: 'modern-btn-ghost',
      secondary: `
        bg-modern-gray-100 text-modern-gray-700
        hover:bg-modern-gray-200 hover:text-modern-gray-800
        transform hover:-translate-y-1px
      `
    };

    const sizes = {
      sm: 'text-sm',
      md: 'text-base', 
      lg: 'text-lg px-8 py-4'
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ');

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Carregando...
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;