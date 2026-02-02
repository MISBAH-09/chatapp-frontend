
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("userToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};


export const getAIConversation = async () => {
  const response = await axios.get(`${API_BASE_URL}/getAIConversation/`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};


export const sendMessage = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sendAIMessage/`,
    payload,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};
