import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OrderType from "../../type/OrderType";

function Order() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadOrders();
        }
    }, [isAuthenticated]);

    async function loadOrders(){
        try {
            const response = await axios.get("http://localhost:8080/orders", config);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteOrder(id: number) {
        try {
            await axios.delete(`http://localhost:8080/orders/${id}`, config);
            loadOrders();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Orders
            </h1>
            
            <div className="flex justify-end mb-4">
                <Link
                    to="/orders/CreateOrder"
                    className="bg-gray-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 transition duration-150"
                >
                    + Create Order
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div key={order.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-150">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
                        <p className="text-gray-600">
                            <span className="font-medium">Date:</span> {new Date(order.orderDateTime).toLocaleString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">Total:</span> Rs. {order.totalPrice.toFixed(2)}
                        </p>
                        
                        <div className="flex justify-between mt-4">
                            <button
                                className="text-gray-800 hover:text-gray-600 transition duration-150"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteOrder(order.id)}
                                className="text-red-600 hover:text-red-400 transition duration-150"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Order;
