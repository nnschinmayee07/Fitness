import React from 'react';
import { User } from 'lucide-react';

export default function ProfileIcon({
  initials = 'U',
  size = 'md',
  onClick = null,
  className = '',
  bgColor = 'bg-[#C97B63]'
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center font-display font-black text-white hover:opacity-90 transition-opacity ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      type="button"
    >
      {initials || <User className="w-1/2 h-1/2" />}
    </button>
  );
}
