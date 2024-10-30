import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function submit(event: React.FormEvent) {
        event.preventDefault();

        if (username === "" || password === "") {
            setError("Username and password are required");
            return;
        }

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post("http://localhost:8080/auth/login", data);
            login(response.data);
            navigate("/");
        } catch (error) {
            setError("There was an error logging in");
        }
    }

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4" 
            style={{
                backgroundImage: `url('https://www.dinamikraf.com/wp-content/uploads/supermarket.jpg?text=Background')`,
                backgroundSize: "cover",    // Ensures image covers the viewport
                backgroundPosition: "center",  // Centers the image
                backgroundRepeat: "no-repeat", // Prevents image from repeating
            }}
        >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                    <p className="text-gray-500 mt-2">Sign in to access your account</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-600 mb-2">Username</label>
                        <input
                            type="text"
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition duration-200"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-600 mb-2">Password</label>
                        <input
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError("");
                            }}
                            className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition duration-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="text-sm text-red-500 text-center mt-2">{error}</div>}

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
