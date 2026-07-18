// src/components/Button.tsx

import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    onClick?: () => void
    href?: string
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    ariaLabel?: string
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    href,
    className = '',
    disabled = false,
    type = 'button',
    ariaLabel,
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center p-3 justify-center font-satoshi font-regular transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variants: Record<ButtonVariant, string> = {
    primary: 'bg-[var(--bg-cta)] w-full gap-3 border-none hover:bg-[var(--on-hover-cta)] focus:ring-[var(--accent-primary)]',
    secondary: 'group bg-transparent gap-3 w-full text-[var(--text-primary)] border border-[var(--border-primary)] rounded-[14px] hover:bg-[var(--on-hover-secondary)] hover:text-[var(--text-on-accent)] focus:ring-[var(--accent-primary)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)] focus:ring-[var(--accent-primary)]',
    }

    const sizes: Record<ButtonSize, string> = {
        sm: '',
        md: '',
        lg: 'py-3 text-body-l rounded-[8px] gap-3',
    }

    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`

    // Si tiene href, renderiza como <a>
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
                aria-label={ariaLabel}
            >
                {children}
            </a>
        )
    }

    // Si no, renderiza como <button>
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
}