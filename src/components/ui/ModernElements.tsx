import React from 'react';

interface ModernSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ModernSection: React.FC<ModernSectionProps> = ({ 
  children, 
  className = '', 
  id 
}) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      {children}
    </section>
  );
};

interface ModernContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ModernContainer: React.FC<ModernContainerProps> = ({ 
  children, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'modern-container-sm',
    md: 'modern-container',
    lg: 'modern-container-lg'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

interface ModernHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({ 
  title, 
  subtitle, 
  badge,
  className = '' 
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <div className="modern-badge mb-6 inline-block">
          {badge}
        </div>
      )}
      <h2 className="modern-headline text-4xl md:text-5xl mb-6">
        {title}
      </h2>
      {subtitle && (
        <p className="modern-lead max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface ModernCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'gradient';
  className?: string;
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  hover = true 
}) => {
  const variants = {
    default: 'modern-card',
    accent: 'modern-card-accent',
    gradient: 'modern-card way-gradient text-white'
  };

  const hoverClass = hover ? 'hover:transform hover:-translate-y-1' : '';

  return (
    <div className={`${variants[variant]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

interface ModernGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ModernGrid: React.FC<ModernGridProps> = ({ 
  children, 
  columns = 3,
  gap = 'md',
  className = '' 
}) => {
  const columnClasses = {
    2: 'modern-grid-2',
    3: 'modern-grid-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12'
  };

  return (
    <div className={`modern-grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

interface ModernStatProps {
  number: string;
  label: string;
  description?: string;
  icon?: string;
  className?: string;
}

export const ModernStat: React.FC<ModernStatProps> = ({ 
  number, 
  label, 
  description,
  icon,
  className = '' 
}) => {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="text-3xl mb-4">{icon}</div>
      )}
      <div className="modern-number mb-2">{number}</div>
      <div className="modern-body font-semibold mb-2">{label}</div>
      {description && (
        <div className="modern-body text-modern-gray-600 text-sm">
          {description}
        </div>
      )}
    </div>
  );
};

interface ModernFeatureProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const ModernFeature: React.FC<ModernFeatureProps> = ({ 
  icon, 
  title, 
  description,
  className = '' 
}) => {
  return (
    <div className={`flex items-start space-x-4 ${className}`}>
      <div className="w-12 h-12 way-gradient rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div>
        <h3 className="modern-subhead text-lg mb-2">{title}</h3>
        <p className="modern-body text-modern-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface ModernBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

export const ModernBadge: React.FC<ModernBadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'modern-badge',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    purple: 'bg-way-purple/10 text-way-purple'
  };

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1'
  };

  return (
    <span className={`inline-flex items-center rounded-lg font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

interface ModernDividerProps {
  className?: string;
  text?: string;
}

export const ModernDivider: React.FC<ModernDividerProps> = ({ 
  className = '',
  text 
}) => {
  if (text) {
    return (
      <div className={`section-break ${className}`}>
        <div className="modern-caption text-way-purple font-bold">{text}</div>
      </div>
    );
  }

  return <div className={`modern-divider ${className}`} />;
};