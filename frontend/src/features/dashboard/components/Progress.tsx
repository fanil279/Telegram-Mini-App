const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
    <div className={`bg-secondary relative h-4 w-full overflow-hidden rounded-full ${className}`}>
        <div
            className='h-full bg-pink-600 transition-all duration-300 ease-in-out'
            style={{ width: `${value}%` }}
        />
    </div>
);

export default Progress;
