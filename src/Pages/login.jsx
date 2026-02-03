import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { loginUser } from '../services/userService';

function Login() {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => setUsernameValue(e.target.value);
  const handlePasswordChange = (e) => setPasswordValue(e.target.value);

  const handleLogin =async () => {
    setErrorMessage('');
    
    let email = ""
    let username =""
    let password = ""
    let message = ""

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;

   
    if (usernameValue.trim() === "") {
      setErrorMessage("Please enter a username or email.");
      return;
    } 

    if (emailRegex.test(usernameValue)) {
      email = usernameValue
    } else if (usernameRegex.test(usernameValue)) {
      username = usernameValue
    }else{
      setErrorMessage("Enter a valid username and email") 
    }
    if (passwordValue.trim()=== ""){
      setErrorMessage("Please enter your password.") 
    }else if (passwordRegex.test(passwordValue)){
      password = passwordValue
    }else{
      setErrorMessage("Password must Have one Capital Letter,one small letter, one number and should be length of minimmum 8")
    }

    try {
      await loginUser(username, email, password);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred");
    }
   
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username or Email"
          className="w-full mb-3 p-2 border rounded"
          value={usernameValue}
          onChange={handleUsernameChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={passwordValue}
          onChange={handlePasswordChange}
        />

        {/* Display the error message if it exists */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
         <p className='text-muted text-xs mt-2'>
            Create account?
            <a href='/signup' className=' ml-2 font-semibold text-blue-500'>Signup</a>
         </p>
      </div>
    </div>
  );
}

export default Login;
