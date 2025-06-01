import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, updateUserProfile, addAddress, updateAddress, deleteAddress } from '../../api/profile/profile';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: ''
    });
    const [addressForm, setAddressForm] = useState({
        addressline1: '',
        addressline2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        loadUserProfile();
    }, [user]);

    const loadUserProfile = async () => {
        if (user?.id) {
            const data = await getUserProfile(user.id);
            if (data) {
                setProfile(data.user);
                setAddresses(data.addresses);
                setFormData({
                    full_name: data.user.full_name || '',
                    email: data.user.email || '',
                    phone: data.user.phone || ''
                });
            }
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (user?.id) {
            const updated = await updateUserProfile(user.id, formData);
            if (updated) {
                setProfile(updated);
                setIsEditing(false);
            }
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        const addressData = {
            ...addressForm,
            user_id: user.id
        };

        if (editingAddress) {
            const updated = await updateAddress(editingAddress.id, addressData);
            if (updated) {
                setAddresses(addresses.map(addr => 
                    addr.id === editingAddress.id ? updated : addr
                ));
            }
        } else {
            const newAddress = await addAddress(addressData);
            if (newAddress) {
                setAddresses([...addresses, newAddress]);
            }
        }
        setEditingAddress(null);
        setAddressForm({
            addressline1: '',
            addressline2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            phone: ''
        });
    };

    const handleDeleteAddress = async (addressId) => {
        const success = await deleteAddress(addressId);
        if (success) {
            setAddresses(addresses.filter(addr => addr.id !== addressId));
        }
    };

    const startEditingAddress = (address) => {
        setEditingAddress(address);
        setAddressForm({
            addressline1: address.addressline1,
            addressline2: address.addressline2 || '',
            city: address.city,
            state: address.state || '',
            postal_code: address.postal_code || '',
            country: address.country,
            phone: address.phone || ''
        });
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').toUpperCase()
            : user?.email?.charAt(0).toUpperCase() || '?';
    };

    if (!profile) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Profile Header */}
                <div className="relative mb-8">
                    <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 rounded-xl"></div>
                    <div className="absolute -bottom-6 left-8 flex items-end">
                        <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white bg-red-500">
                            {getInitials(profile.full_name)}
                        </div>
                        <div className="ml-6 mb-[2rem]">
                            <h1 className="text-2xl font-bold text-white">{profile.full_name || 'Your Profile'}</h1>
                            <p className="text-red-100">{profile.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                            
                            {isEditing ? (
                                <form onSubmit={handleProfileSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500 w-24">Full Name</span>
                                        <span className="text-gray-800">{profile.full_name}</span>
                                    </div>
                                    <div className="flex items-center py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-500 w-24">Email</span>
                                        <span className="text-gray-800">{profile.email}</span>
                                    </div>
                                    <div className="flex items-center py-2">
                                        <span className="text-sm text-gray-500 w-24">Phone</span>
                                        <span className="text-gray-800">{profile.phone || 'Not provided'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Addresses Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Addresses</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {addresses.map((address) => (
                                    <div key={address.id} className="border border-gray-100 rounded-lg p-4 hover:border-red-100 transition-colors">
                                        <div className="mb-4">
                                            <p className="font-medium">{address.addressline1}</p>
                                            {address.addressline2 && <p className="text-gray-600">{address.addressline2}</p>}
                                            <p className="text-gray-600">{address.city}, {address.state} {address.postal_code}</p>
                                            <p className="text-gray-600">{address.country}</p>
                                            {address.phone && <p className="text-gray-600 mt-2">📞 {address.phone}</p>}
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => startEditingAddress(address)}
                                                className="text-sm font-medium text-red-600 hover:text-red-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAddress(address.id)}
                                                className="text-sm font-medium text-gray-600 hover:text-gray-700"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* New/Edit Address Form */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-medium mb-4">
                                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                                </h3>
                                <form onSubmit={handleAddressSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Address Line 1</label>
                                            <input
                                                type="text"
                                                value={addressForm.addressline1}
                                                onChange={(e) => setAddressForm({...addressForm, addressline1: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Address Line 2</label>
                                            <input
                                                type="text"
                                                value={addressForm.addressline2}
                                                onChange={(e) => setAddressForm({...addressForm, addressline2: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                                            <input
                                                type="text"
                                                value={addressForm.city}
                                                onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                                            <input
                                                type="text"
                                                value={addressForm.state}
                                                onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Postal Code</label>
                                            <input
                                                type="text"
                                                value={addressForm.postal_code}
                                                onChange={(e) => setAddressForm({...addressForm, postal_code: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                                            <input
                                                type="text"
                                                value={addressForm.country}
                                                onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                                            <input
                                                type="tel"
                                                value={addressForm.phone}
                                                onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                                                className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 pt-4">
                                        {editingAddress && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingAddress(null);
                                                    setAddressForm({
                                                        addressline1: '',
                                                        addressline2: '',
                                                        city: '',
                                                        state: '',
                                                        postal_code: '',
                                                        country: '',
                                                        phone: ''
                                                    });
                                                }}
                                                className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            {editingAddress ? 'Update Address' : 'Add Address'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;