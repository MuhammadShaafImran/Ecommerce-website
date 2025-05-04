import supabase from '../supabase';

const verifyPassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword;
}

const getUserByEmailOrUsername = async (user) => {
    console.log("User data:", user);
    
    const orFilter = `email.eq.${user.usernameOrEmail},username.eq.${user.usernameOrEmail}`;
  
    const { data, error } = await supabase
      .from("users")
      .select("id, password") 
      .or(orFilter)
      .single();
  
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  
    // Verify password (e.g., using bcrypt)
    const isPasswordValid = verifyPassword(user.password, data.password);
    if (!isPasswordValid) {
      return null;
    }
  
    return data.id;
}

const getUserById = async (user) => {
    
}

export {getUserByEmailOrUsername, getUserById};