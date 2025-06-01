import supabase from '../supabase';

// Get user profile and address
export const getUserProfile = async (userId) => {
    try {
        // Get user data
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, email, full_name, phone')
            .eq('id', userId)
            .single();

        if (userError) throw userError;

        // Get user addresses
        const { data: addressData, error: addressError } = await supabase
            .from('addresses')
            .select('*')
            .eq('user_id', userId);

        if (addressError) throw addressError;

        return {
            user: userData,
            addresses: addressData
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .update({
                full_name: userData.full_name,
                phone: userData.phone,
                email: userData.email
            })
            .eq('id', userId)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error updating user profile:', error);
        return null;
    }
};

// Add new address
export const addAddress = async (addressData) => {
    try {
        const { data, error } = await supabase
            .from('addresses')
            .insert([addressData])
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error adding address:', error);
        return null;
    }
};

// Update address
export const updateAddress = async (addressId, addressData) => {
    try {
        const { data, error } = await supabase
            .from('addresses')
            .update(addressData)
            .eq('id', addressId)
            .select();

        if (error) throw error;
        return data[0];
    } catch (error) {
        console.error('Error updating address:', error);
        return null;
    }
};

// Delete address
export const deleteAddress = async (addressId) => {
    try {
        const { error } = await supabase
            .from('addresses')
            .delete()
            .eq('id', addressId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting address:', error);
        return false;
    }
};
