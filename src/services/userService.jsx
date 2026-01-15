import axios from "axios";

export const loginUser = async (username, email, password) => {
  const API_URL = "http://localhost:8000";
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      email,
      password,
    });

    const result = response.data; // axios auto-parses JSON

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    const token = result.data?.token;
    console.log("Token:", token);

    if (!token) {
      throw new Error("Token missing in response");
    }

    localStorage.setItem("userToken", token);
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
};
