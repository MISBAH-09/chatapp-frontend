// login API call
export const loginUser = async (username, email, password) => {
  const API_URL = 'http://localhost:8000/login/';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const result = await response.json(); // parse once

    // If backend says failure
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Login failed');
    }

    const token = result.data?.token;

    if (!token) {
      throw new Error('Token missing in response');
    }

    localStorage.setItem('userToken', token);
    return result; // return full response

  } catch (error) {
    console.error("Error during login API call:", error);
    throw error; // pass message to UI
  }
};


// You might also want a helper function to get the token later
export const getToken = () => {
  return localStorage.getItem('userToken');
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
};
