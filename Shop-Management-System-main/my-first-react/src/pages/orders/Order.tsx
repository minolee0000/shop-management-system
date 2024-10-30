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
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-10 text-center text-blue-800 p-4 rounded-lg bg-blue-100 shadow-md">
                Orders
            </h1>
            
            <div className="flex justify-end mb-6">
                <Link
                    to="/orders/CreateOrder" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-md transition duration-200 shadow-sm"
                >
                    Create Order
                </Link>
            </div>
    
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden border border-slate-200">
                <thead className="bg-blue-700 text-white uppercase text-sm">
                    <tr>
                        <th className="font-semibold py-4 px-6 text-left">Order ID</th>
                        <th className="py-5 px-5 text-left">Order Date and Time</th>
                        <th className="py-5 px-5 text-left">Total Amount</th>
                        <th className="py-5 px-5 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-slate-700 text-sm">
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-slate-200 hover:bg-gray-100 transition-colors">
                            <td className="py-4 px-6 text-left">{order.id}</td>
                            <td className="py-4 px-6 text-left">{new Date(order.orderDateTime).toLocaleString()}</td>
                            <td className="py-4 px-6 text-left">Rs. {order.totalPrice.toFixed(2)}</td>
                            <td className="py-4 px-6 text-left flex space-x-2">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 shadow-sm">
                                    Edit
                                </button>
                                <button onClick={() => deleteOrder(order.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 shadow-sm" >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}

export default Order;
