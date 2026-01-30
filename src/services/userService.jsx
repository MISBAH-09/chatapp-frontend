import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("userToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

export const loginUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      email,
      password,
    });

    const result = response.data; // axios auto-parses JSON

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    const token = result.data?.token;
    const id = result.data?.id
    console.log("Token:", token);

    if (!token) {
      throw new Error("Token missing in response");
    }

    localStorage.setItem("userToken", token);
    localStorage.setItem("userId", id);
    return result;

  } catch (error) {
    console.error("Error during login API call:", error);

    // Handle backend error message properly
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Network error or server not responding");
    }
  }
};

export const getToken = () => {
  return localStorage.getItem('userToken');
};

export const logoutUser = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem("userId");
};

export const currentUserId = () => {
  return localStorage.getItem("userId"); 
};

// get users
export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/get/`, {
    headers: getAuthHeaders(),
  });
  return response.data.data;
};

// update user
export const updateUser = async (payload) => {
  const response = await axios.put(`${API_BASE_URL}/update/`,
     payload, 
    { 
      headers: getAuthHeaders() 
    });
  if (!response.data.success)
    throw new Error(response.data.message || "Failed to update");
  return response.data.data;
};

// add user by email
export const addUser = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addbyemail/`, 
      { email },
      { headers: getAuthHeaders() }
    );
    return response.data;  
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);  
    }
    throw error;  
  }
};


