import React from 'react';

const VARIANT_STYLES = {
  flat: 'bg-white border border-slate-100 shadow-sm',
  elevated: 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50',
  dark: 'bg-slate-900 border border-slate-900 text-white shadow-2xl',
};

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

export const Card = React.forwardRef(
  ({ as: Component = 'div', variant = 'flat', className = '', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={joinClasses(
          'rounded-[2rem] transition-all duration-200',
          VARIANT_STYLES[variant] ?? VARIANT_STYLES.flat,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
