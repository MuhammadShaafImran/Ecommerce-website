import supabase from '../supabase';

const registerUser = async (user) => {
    const { data, error } = await supabase
        .from('users')
        .insert([
        {
            username: user.username,
            email: user.email,
            password: user.password,
            full_name: user.username,
            phone: "",
        },
        ])
        .select('*');
    
    if (error) {
        console.error('Error writing user to database:', error);
        return null;
    }
    return data[0];
}

export {registerUser};