'use client';

import { useState } from 'react';
import { User } from '@/types';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 'u1', name: 'Rahul Kumar', email: 'rahul@gmail.com', phone: '+91 98765 43210', address: 'Kharghar Sec 35E', area: 'Kharghar Sector 35', role: 'user', createdAt: new Date(), isBlocked: false },
    { id: 'u2', name: 'Priya Singh', email: 'priya@gmail.com', phone: '+91 87654 32109', address: 'Kharghar Sec 36', area: 'Kharghar Sector 36', role: 'user', createdAt: new Date(), isBlocked: false },
    { id: 'u3', name: 'Archana Admin', email: 'admin@archanaszaika.com', phone: '+91 99999 88888', address: 'Kharghar Sec 35E', area: 'Kharghar Sector 35', role: 'admin', createdAt: new Date(), isBlocked: false },
  ]);

  const handleToggleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : u))
    );
    toast.success('User role updated!');
  };

  const handleToggleBlock = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u))
    );
    toast.success('User status updated');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
          User Accounts & Role Control 👥
        </h1>
        <p className="text-xs text-warm-gray-500 mt-1">
          Promote users to Admins or manage user permissions across the platform.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-50 text-warm-gray-600 font-heading text-xs uppercase tracking-wider border-b border-cream-200">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100 text-warm-gray-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-cream-50/50 transition-colors">
                <td className="p-4 font-bold text-warm-gray-900">{u.name}</td>
                <td className="p-4 text-warm-gray-600">{u.email}</td>
                <td className="p-4 text-warm-gray-600">{u.phone}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      u.role === 'admin'
                        ? 'bg-purple-100 text-purple-700 border border-purple-200'
                        : 'bg-cream-100 text-warm-gray-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleRole(u.id)}
                    className="px-3 py-1 bg-saffron-50 text-saffron-700 rounded-lg text-xs font-semibold hover:bg-saffron-100"
                  >
                    {u.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                  </button>
                  <button
                    onClick={() => handleToggleBlock(u.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      u.isBlocked
                        ? 'bg-fresh-100 text-fresh-700 hover:bg-fresh-200'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {u.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
