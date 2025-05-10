import supabase from '../supabase';

const verifyPassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword;
}

const getUserByEmailOrUsername = async (user) => {
    console.log("User data:", user);
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .or(`email.eq.${user.usernameOrEmail},username.eq.${user.usernameOrEmail}`)
      .single();
  
    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  
    // Verify password
    const isPasswordValid = verifyPassword(user.password, data.password);
    if (!isPasswordValid) {
      return null;
    }
  
    return data;
}

const getUserById = async (user) => {
    
}

export {getUserByEmailOrUsername, getUserById};