export default function AuthLayout({ children }) {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-50">
            {children}
        </div>
    );
}
