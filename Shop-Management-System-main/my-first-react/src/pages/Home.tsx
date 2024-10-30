import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const [username, setUsername] = useState<string>("");
    const { logout } = useAuth();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 md:p-10"
            style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080?text=Supermarket)' }}
        >
            <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-left text-3xl md:text-4xl font-bold text-gray-700 mb-8">Welcome, {username}</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Updated Button Styles */}
                    <Link to="/contactus" className={buttonStyle}>Contact Us</Link>
                    <Link to="/product" className={buttonStyle}>Product</Link>
                    <Link to="/category" className={buttonStyle}>Category</Link>
                    <Link to="/order" className={buttonStyle}>Order</Link>
                </div>

                {/* Centered Logout Button */}
                <div className="flex justify-center">
                    <button 
                        onClick={logout} 
                        className="py-3 px-6 rounded-lg font-semibold text-white bg-pink-500 shadow-md hover:bg-pink-600 hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-pink-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

// Updated Tailwind CSS for button styling with a softer color palette and rounded corners
const buttonStyle = `py-3 px-6 rounded-md font-medium text-white bg-blue-500 shadow-md
    hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out 
    text-center focus:outline-none focus:ring-4 focus:ring-blue-300`;

export default Home;
