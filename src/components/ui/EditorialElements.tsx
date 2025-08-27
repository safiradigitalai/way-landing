import React from 'react';

interface EditorialLineProps {
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'full';
}

export const EditorialLine: React.FC<EditorialLineProps> = ({ 
  className = '', 
  width = 'md' 
}) => {
  const widthClasses = {
    sm: 'w-16',
    md: 'w-32',
    lg: 'w-48',
    full: 'w-full'
  };

  return (
    <div className={`editorial-line ${widthClasses[width]} ${className}`} />
  );
};

interface EditorialNumberProps {
  number: string | number;
  className?: string;
}

export const EditorialNumber: React.FC<EditorialNumberProps> = ({ 
  number, 
  className = '' 
}) => {
  return (
    <div className={`editorial-number ${className}`}>
      {typeof number === 'number' ? String(number).padStart(2, '0') : number}
    </div>
  );
};

interface EditorialQuoteProps {
  children: React.ReactNode;
  author?: string;
  className?: string;
}

export const EditorialQuote: React.FC<EditorialQuoteProps> = ({ 
  children, 
  author, 
  className = '' 
}) => {
  return (
    <blockquote className={`editorial-quote ${className}`}>
      <div className="editorial-body text-xl italic mb-4">
        {children}
      </div>
      {author && (
        <footer className="editorial-caption text-editorial-gray">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

interface EditorialChapterProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialChapter: React.FC<EditorialChapterProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`editorial-chapter-break ${className}`}>
      <span>{children}</span>
    </div>
  );
};

interface EditorialAccentBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialAccentBox: React.FC<EditorialAccentBoxProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`editorial-card-featured ${className}`}>
      {children}
    </div>
  );
};

interface EditorialStatProps {
  number: string;
  label: string;
  description?: string;
  className?: string;
}

export const EditorialStat: React.FC<EditorialStatProps> = ({ 
  number, 
  label, 
  description, 
  className = '' 
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="editorial-number text-5xl mb-2">{number}</div>
      <div className="editorial-caption mb-1">{label}</div>
      {description && (
        <div className="editorial-body text-sm text-editorial-gray">
          {description}
        </div>
      )}
    </div>
  );
};

interface EditorialGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EditorialGrid: React.FC<EditorialGridProps> = ({ 
  children, 
  columns = 2, 
  gap = 'md',
  className = '' 
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-8',
    md: 'gap-12',
    lg: 'gap-16'
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

interface EditorialImagePlaceholderProps {
  aspectRatio?: 'square' | 'landscape' | 'portrait';
  caption?: string;
  className?: string;
}

export const EditorialImagePlaceholder: React.FC<EditorialImagePlaceholderProps> = ({ 
  aspectRatio = 'landscape',
  caption,
  className = '' 
}) => {
  const aspectClasses = {
    square: 'aspect-square',
    landscape: 'aspect-[4/3]',
    portrait: 'aspect-[3/4]'
  };

  return (
    <figure className={className}>
      <div className={`bg-editorial-bg-gray ${aspectClasses[aspectRatio]} flex items-center justify-center`}>
        <div className="w-16 h-16 bg-editorial-black rounded-full flex items-center justify-center">
          <span className="text-white font-display text-xl">W</span>
        </div>
      </div>
      {caption && (
        <figcaption className="editorial-caption text-center mt-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};