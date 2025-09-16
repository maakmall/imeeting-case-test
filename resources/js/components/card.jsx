export default function Card({ children, className }) {
    return (
        <div className={`border border-[#EEEEEE] rounded-lg py-5 px-7 shadow-[0px_4px_20px_0px_#6A6A6A1A] ${className}`}>
            {children}
        </div>
    );
}
