import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface TextProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  h1: 'text-4xl font-bold text-font',
  h2: 'text-2xl font-bold text-font',
  h3: 'text-xl font-bold text-font',
  h4: 'text-lg font-bold text-font',
  h5: 'text-base font-bold text-font',
  h6: 'text-sm font-bold text-font',
  p: 'text-base text-font',
  span: 'text-base text-font',
};

export default function Text({
  variant = 'p',
  className = '',
  children,
}: TextProps) {
  const Component = variant;
  const baseStyle = variantStyles[variant];

  return (
    <Component className={`${baseStyle} ${className}`.trim()}>
      {children}
    </Component>
  );
}
