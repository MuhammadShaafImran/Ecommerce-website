const validateSignup = (formData) => {
    const errors = {};
    const { email, username, password } = formData;
    const isEmpty = (value) => !value || value.trim() === "";
    // Email validation
    if (isEmpty(email)) {
      errors.email = "Email is required";
    } else {
      // Simple email regex for format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Email is invalid";
      }
    }
    // Username validation
    if (isEmpty(username)) {
      errors.username = "Username is required";
    }
  
    // Password validation
    if (isEmpty(password)) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
  
    return errors;
  };
  
  const validateLogin = (formData) => {
    const errors = {}
    const { emailOrUser, password } = formData;
    const isEmpty = (value) => !value || value.trim() === "";
    // Email validation
    if (isEmpty(emailOrUser)) {
      errors.emailOrUser = "Email or Username required";
    }
    // Password validation
    if (isEmpty(password)) {
      errors.password = "Password is required";
    }

    return errors;
  }

  export {validateLogin,validateSignup};