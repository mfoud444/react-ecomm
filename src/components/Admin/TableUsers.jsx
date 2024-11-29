import React, { useEffect, useState } from 'react';
import get from '../../utils/request';  

const TableUsers = () => {
    const [users, setUsers] = useState([]); // State to store users

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await get({ url: 'users', method: 'GET' });
                setUsers(response); // Assuming response contains the users' data array
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container my-6">
            <h2 className="text-2xl font-bold mb-4">Users Table</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Phone Number</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-2 px-4">{user.id}</td>
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.phoneNumber}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableUsers;
