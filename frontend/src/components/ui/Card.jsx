const Card = ({ children, className = '', title, ...props }) => {
    return (
        <div
            className={`bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 ${className}`}
            {...props}
        >
            {title && (
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
            )}
            {children}
        </div>
    );
};

export default Card;
