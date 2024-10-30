import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProductType from "../../type/ProductType";

function CreateOrder() {
    const { isAuthenticated, jwtToken } = useAuth();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [orderProducts, setOrderProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const orderRef = useRef<HTMLDivElement | null>(null); // Ref for the order container

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadProducts();
        }
    }, [isAuthenticated]);

    // Load products from the API
    async function loadProducts() {
        try {
            const response = await axios.get("http://localhost:8080/products", config);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Add product to the order and update the total
    function addProductToOrder(product: ProductType) {
        const updatedOrder = [...orderProducts, product];
        setOrderProducts(updatedOrder);
        setTotal(prevTotal => parseFloat((prevTotal + product.price).toFixed(2)));

        // Scroll to the bottom of the order list
        if (orderRef.current) {
            orderRef.current.scrollTop = orderRef.current.scrollHeight;
        }
    }

    const navigate = useNavigate();

    async function saveOrder() {
        const productIds = orderProducts.map(product => product.id);
        try {
            await axios.post("http://localhost:8080/orders", { productIds }, config);
            navigate("/order");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 text-gray-900">
            <div className="w-[500px] border-r border-gray-300 p-6 bg-gradient-to-br from-blue-600 shadow-lg">
                <h2 className="text-3xl font-semibold text-white mb-6">Available Products</h2>
    
     
                <div className="h-[600px] overflow-y-auto bg-white p-4 rounded-lg shadow">
                    <div className="space-y-5">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => addProductToOrder(product)}
                                className="flex items-center p-5 border border-gray-300 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer transition-transform duration-200 transform hover:scale-105 shadow-md"
                            >
                                <div className="flex items-center justify-center w-[30%] h-12 bg-blue-150 rounded-full mr-4">
                                    <span className="text-blue-700 font-bold text-xl">{product.name.charAt(0)}</span>
                                </div>

                                <div className="w-[65%]">
                                    <div className="text-lg font-semibold text-gray-800">{product.name}</div>
                                    <div className="text-sm text-gray-600">{product.category?.name}</div>
                                </div>
                            
                                <div className="w-[20%] text-lg font-semibold text-blue-700 text-right">
                                    ${product.price.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-10 flex-1 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">New Order</h2>
                <p className="text-gray-600 text-lg mb-8">Select products from the list to add them to your order.</p>
    
                <div className="border border-slate-100 rounded-lg shadow-inner bg-gray-50">
                    <div ref={orderRef} className="h-[500px] overflow-y-auto">
                        <table className="w-full text-left text-gray-800 border-separate border-spacing-0">
                            <thead className="bg-blue-700 text-white">
                                <tr>
                                    <th className="py-4 px-4 w-[20%] text-base">ID</th>
                                    <th className="py-4 px-4 w-[50%] text-base">Description</th>
                                    <th className="py-4 px-4 w-[30%] text-base text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts.map((product, index) => (
                                    <tr key={`${product.id}-${index}`} className="hover:bg-blue-50 transition duration-150">
                                        <td className="border-b py-4 px-2">{product.id}</td>
                                        <td className="border-b py-4 px-2">{product.name}</td>
                                        <td className="border-b py-4 px-2 text-right">${product.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
    
                    <div className="p-5 border-t border-gray-200 bg-white">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="text-right py-2 font-semibold text-gray-800 text-lg">
                                        Total
                                    </td>
                                    <td className="py-2 text-blue-700 font-bold text-xl text-right">
                                        Rs.{total.toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    
                <button
                    onClick={saveOrder}
                    className="mt-6 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-700 
                    text-white font-semibold text-lg px-6 py-3 rounded-md transition-transform duration-200 transform hover:scale-105 shadow-md">       
                    Place Order
                </button>
            </div>
        </div>
    );  
}

export default CreateOrder;
