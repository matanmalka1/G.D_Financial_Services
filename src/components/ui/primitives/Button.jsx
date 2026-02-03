import React from 'react';

const VARIANT_STYLES = {
  solid:
    'bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900',
  outline: 'border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:shadow-lg',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-50',
  text: 'bg-transparent text-slate-600 hover:text-slate-900',
  link: 'bg-transparent text-indigo-600 hover:text-indigo-500 underline underline-offset-4 hover:no-underline',
};

const SIZE_STYLES = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const joinClasses = (...classes) => classes.filter(Boolean).join(' ');

export const Button = React.forwardRef(
  (
    {
      as: Component = 'button',
      variant = 'solid',
      size = 'md',
      className = '',
      children,
      type,
      ...props
    },
    ref
  ) => {
    const combinedClasses = joinClasses(
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed',
      SIZE_STYLES[size] ?? SIZE_STYLES.md,
      VARIANT_STYLES[variant] ?? VARIANT_STYLES.solid,
      className
    );

    const componentProps = {
      ref,
      className: combinedClasses,
      ...props,
    };

    if (Component === 'button') {
      componentProps.type = type ?? 'button';
    } else if (type) {
      componentProps.type = type;
    }

    return <Component {...componentProps}>{children}</Component>;
  }
);

Button.displayName = 'Button';
