import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL;

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("userToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};



// get conversation
export const getConversation = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/getConversation/`,
    payload,
    { headers: getAuthHeaders() }
  );
  return response.data;
};


//delete message 
export const delMessage = async (message_id) => {
  const response = await axios.post(
    `${API_BASE_URL}/deleteMessage/`,
    {
      message_id,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

//update message 
export const updMessage = async (message_id,message_body) => {
  const response = await axios.put(
    `${API_BASE_URL}/updateMessage/`,
    {
      message_id,
      message_body,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

// get all conversation messages
export const getAllConversationMessages = async (conversation_id) =>{
  const response = await axios.post(
    `${API_BASE_URL}/getConversationMessages/`,
    {
      conversation_id,
    },
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
}

//  ------------------- not using these api shifted to sockets ---------------------

// export const sendMessage = async (payload) => {
//   const response = await axios.post(
//     `${API_BASE_URL}/sendMessage/`,
//     payload,
//     {
//       headers: getAuthHeaders(),
//     }
//   );
//   return response.data;
// };

// fetch all users
export const fetchAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/fetchAllUsers/`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// get All conversations
export const getAllConversation = async (user_id) => {
  const response = await axios.get(`${API_BASE_URL}/getAllConversations/`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

