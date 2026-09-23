import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

const API_BASE = "https://api.dastrkhwan.site";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/admin/get_dashboard_details.php?type=contact_messages`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setMessages(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <AdminLayout pageTitle="Contact Messages">
            {loading ? (
                <p>Loading messages...</p>
            ) : messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>MESSAGE</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.id}>
                                <td>{msg.id}</td>
                                <td>{msg.name}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>{msg.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
}

export default Messages;