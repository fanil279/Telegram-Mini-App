const Avatar = ({
    className = '',
    src,
    alt = 'avatar photo',
}: {
    className?: string;
    src: string;
    alt?: string;
}) => {
    return (
        <div
            className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
        >
            <img className='aspect-square h-full w-full object-cover' src={src} alt={alt} />
        </div>
    );
};

export default Avatar;
