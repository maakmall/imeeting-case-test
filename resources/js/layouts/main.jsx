import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 px-7 pb-6 pt-23 ml-[72px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
