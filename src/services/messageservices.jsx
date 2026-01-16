import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("userToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

// fetch all users
export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/fetchallusers/`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// get conversation
export const getConversation = async (user_id) => {
  const response = await axios.post(
    `${API_BASE_URL}/getConversation/`,
    {
      user_id,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// get All conversations
export const getAllConversation = async (user_id) => {
  const response = await axios.get(`${API_BASE_URL}/getAllConversations/`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};