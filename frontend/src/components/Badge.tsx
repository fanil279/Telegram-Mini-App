const Badge = ({
    children,
    className = '',
    variant = 'default',
}: {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'secondary' | 'outline';
}) => {
    const variants = {
        default: 'bg-pink-600 text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border bg-card',
    };

    return (
        <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
        >
            {children}
        </div>
    );
};

export default Badge;
