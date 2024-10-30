import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CategoryType from "../type/categoryType";

function Category() {

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");

    const { isAuthenticated, jwtToken } = useAuth();
    const config = { headers: { Authorization: `Bearer ${jwtToken}` } };

    useEffect(() => {
        if (isAuthenticated) {
            loadCategories();
        }
    }, [isAuthenticated]);

    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8080/category", config);
            setCategories(response.data);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    function handleCategoryName(event: React.ChangeEvent<HTMLInputElement>) {
        setCategoryName(event.target.value);
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const data = { name: categoryName };

        try {
            await axios.post("http://localhost:8080/category", data, config);
            loadCategories();
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }

    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Category</h1>

            <div className="flex justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center mb-6">
                    {categories.length > 0 ? (
                        categories.map((category: CategoryType) => (
                            <div key={category.id} className="border-b border-gray-200 py-2 text-lg font-medium text-slate-600">
                                {category.name}
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-600 text-lg">Categories haven't created yet.</p>
                    )}
                </div>
            </div>

            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                    <h2 className="text-3xl font-semibold text-slate-800 mb-4">Create New Category</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-left text-xl font-semibold text-gray-600 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={handleCategoryName}
                                className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg text-xl transition duration-200"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;
