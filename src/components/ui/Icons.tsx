import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const RocketIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.6"/>
      </linearGradient>
    </defs>
    <path d="M2.5 19L5.91 15.59C6.67 16.81 7.78 17.78 9.08 18.34L5.5 22C4.67 22 3.33 20.67 2.5 19Z" fill="url(#rocketGradient)"/>
    <path d="M9.5 3C10.5 2 14 2 16 4S22 10.5 21 11.5L18.5 14L17 12.5L16 10L14 9L12.5 7.5L15 5C14 4 10.5 3 9.5 3Z" fill="currentColor"/>
    <circle cx="15.5" cy="8.5" r="1.5" fill="white"/>
    <path d="M6 16L8 14L10 16L8 18L6 16Z" fill="currentColor" opacity="0.7"/>
  </svg>
);

export const PhoneIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 2C5.67 2 5 2.67 5 3.5V20.5C5 21.33 5.67 22 6.5 22H17.5C18.33 22 19 21.33 19 20.5V3.5C19 2.67 18.33 2 17.5 2H6.5ZM12 19C11.45 19 11 18.55 11 18S11.45 17 12 17 13 17.45 13 18 12.55 19 12 19Z" fill="currentColor"/>
    <rect x="7" y="4" width="10" height="12" rx="1" fill="currentColor" opacity="0.3"/>
  </svg>
);

export const MoneyIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
    <path d="M12 6V8M12 16V18M8.5 9.5C8.5 8.67 9.17 8 10 8H14C14.83 8 15.5 8.67 15.5 9.5C15.5 10.33 14.83 11 14 11H10C9.17 11 8.5 11.67 8.5 12.5C8.5 13.33 9.17 14 10 14H14C14.83 14 15.5 14.67 15.5 15.5C15.5 16.33 14.83 17 14 17H10C9.17 17 8.5 16.33 8.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ThunderIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L8.5 12H12L11 22L15.5 12H12L13 2Z" fill="currentColor"/>
    <path d="M13 2L8.5 12H12L11 22L15.5 12H12L13 2Z" fill="url(#thunderGradient)"/>
    <defs>
      <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="100%" stopColor="#FF8C00"/>
      </linearGradient>
    </defs>
  </svg>
);

export const ShieldIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CarIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13L7 7H17L19 13V19C19 19.55 18.55 20 18 20H17C16.45 20 16 19.55 16 19V18H8V19C8 19.55 7.55 20 7 20H6C5.45 20 5 19.55 5 19V13Z" fill="currentColor"/>
    <circle cx="8" cy="15" r="1.5" fill="white"/>
    <circle cx="16" cy="15" r="1.5" fill="white"/>
    <path d="M7 7L8 11H16L17 7H7Z" fill="currentColor" opacity="0.7"/>
  </svg>
);

export const LocationIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
    <circle cx="12" cy="9" r="3" fill="white"/>
  </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
    <path d="M6 3L6.5 5.5L9 6L6.5 6.5L6 9L5.5 6.5L3 6L5.5 5.5L6 3Z" fill="currentColor" opacity="0.8"/>
    <path d="M18 4L18.5 6L20 6.5L18.5 7L18 9L17.5 7L16 6.5L17.5 6L18 4Z" fill="currentColor" opacity="0.6"/>
  </svg>
);

export const DocumentIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor" opacity="0.2"/>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 13H16M8 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const TargetIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export const TrendingUpIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L11.2 12.8L15.8 17.4L22 11.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 11H22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeafIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" opacity="0.1"/>
    <path d="M12 2C13.5 2 15.5 3.5 17 7C18.5 10.5 17.5 14.5 15 16.5C12.5 18.5 9.5 18 7.5 15.5C5.5 13 6 9.5 8.5 7C10 5 11 2 12 2Z" fill="currentColor"/>
    <path d="M8.5 12.5C10.5 14.5 12.5 14 14 12.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    <path d="M4 20C4 16 7.58 14 12 14S20 16 20 20V22H4V20Z" fill="currentColor" opacity="0.7"/>
  </svg>
);

export const ChatIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.5C21 16.75 16.75 21 11.5 21C10.22 21 8.99 20.8 7.87 20.42L3 22L4.58 17.13C4.2 16.01 4 14.78 4 13.5C4 8.25 8.25 4 13.5 4C18.75 4 23 8.25 23 13.5V11.5H21Z" fill="currentColor"/>
    <circle cx="8" cy="13" r="1" fill="white"/>
    <circle cx="12" cy="13" r="1" fill="white"/>
    <circle cx="16" cy="13" r="1" fill="white"/>
  </svg>
);

export const DownloadIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V16M12 16L8 12M12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M8 12L11 15L16 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 20.97L12 17.77L5.82 20.97L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
  </svg>
);

export const AlertIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ClockIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AppleIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

export const AndroidIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02L19.09 8.114c.1603-.0926.2142-.2975.1207-.4578-.0931-.1603-.2975-.2138-.4578-.1207L17.5.3414c-.1603.0926-.2142.2975-.1207.4578l1.2079.6982c-.8717-.4906-1.8769-.7736-2.9479-.7736-1.071 0-2.0762.283-2.9479.7736l1.2079-.6982c.0931-.1603.0396-.3652-.1207-.4578-.1603-.0931-.3647-.0396-.4578.1207L11.881 9.3214c1.0711-.6018 2.3232-.6018 3.3943 0z"/>
  </svg>
);

export const ArrowUpIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LockIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" fill="currentColor"/>
    <circle cx="12" cy="16" r="1" fill="white"/>
    <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const HeartIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export const EmailIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor"/>
    <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);