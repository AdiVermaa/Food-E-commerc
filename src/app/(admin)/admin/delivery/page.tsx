'use client';

import { useState } from 'react';
import { deliveryAreas as initialAreas } from '@/lib/demoData';
import { DeliveryArea } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlinePlus } from 'react-icons/hi';

export default function AdminDeliveryPage() {
  const [areas, setAreas] = useState<DeliveryArea[]>(initialAreas);
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

  const handleToggleServiceable = (id: string) => {
    setAreas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isServiceable: !a.isServiceable } : a))
    );
    toast.success('Delivery area status updated');
  };

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !pincode) return;

    const newArea: DeliveryArea = {
      id: String(Date.now()),
      name,
      pincode,
      deliveryCharge,
      isServiceable: true,
      estimatedTime: '30-40 min',
    };
    setAreas((prev) => [...prev, newArea]);
    toast.success(`Added ${name} to delivery zones!`);
    setName('');
    setPincode('');
    setDeliveryCharge(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-warm-gray-900">
          Delivery Area & Fee Config 📍
        </h1>
        <p className="text-xs text-warm-gray-500 mt-1">
          Configure serviceable pincodes near Kharghar and customize delivery charges per zone.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Existing Areas Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 text-warm-gray-600 font-heading text-xs uppercase tracking-wider border-b border-cream-200">
              <tr>
                <th className="p-4">Area Name</th>
                <th className="p-4">Pincode</th>
                <th className="p-4">Delivery Charge</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100 text-warm-gray-800">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-cream-50/50 transition-colors">
                  <td className="p-4 font-bold text-warm-gray-900">{area.name}</td>
                  <td className="p-4 font-mono text-warm-gray-600">{area.pincode}</td>
                  <td className="p-4 font-semibold text-saffron-700">
                    {area.deliveryCharge === 0 ? 'FREE' : `₹${area.deliveryCharge}`}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        area.isServiceable ? 'bg-fresh-100 text-fresh-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {area.isServiceable ? 'Serviceable' : 'Disabled'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleServiceable(area.id)}
                      className="px-3 py-1 bg-cream-100 text-warm-gray-700 rounded-lg text-xs font-semibold hover:bg-cream-200"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Zone Form */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-cream-200 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-lg text-warm-gray-900">+ Add Delivery Zone</h3>
          <form onSubmit={handleAddArea} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Zone Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kharghar Sector 30"
                className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Pincode *</label>
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="410210"
                className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-gray-700 mb-1">Delivery Charge (₹)</label>
              <input
                type="number"
                min={0}
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-200 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 gradient-saffron text-white font-semibold rounded-xl text-sm shadow-md hover:opacity-95 transition-all"
            >
              Save Zone
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
