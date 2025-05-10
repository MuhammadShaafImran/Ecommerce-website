import supabase from '../supabase';

const registerUser = async (user) => {
    try {
        // First create the auth user
        const { data: authUser, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password
        });

        if (authError) throw authError;

        // Then create the user record in our users table
        const { data, error } = await supabase
            .from('users')
            .insert([
            {
                id: authUser.user.id, // Use the auth user id
                username: user.username,
                email: user.email,
                password: user.password, // In production, should hash this
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