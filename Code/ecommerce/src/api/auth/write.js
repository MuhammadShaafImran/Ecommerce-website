import supabase from '../supabase';

const registerUser = async (user) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
            {
                username: user.username,
                email: user.email,
                password: user.password, 
                full_name: user.username,
                phone: "",
                role: 'customer' // Default role
            },
            ])
            .select('*');
        
        if (error) {
            console.error('Error writing user to database:', error);
            return null;
        }
        return data[0];
    } catch (error) {
        console.error('Error during registration:', error);
        return null;
    }
}

export {registerUser};