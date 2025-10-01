const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
        className={`bg-card text-card-foreground border-border rounded-lg border shadow-sm ${className}`}
    >
        {children}
    </div>
);

export default Card;
