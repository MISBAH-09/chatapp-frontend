import AxiosInstance from "./axiosInstance";

// fetch all users
export const fetchAllUsers = async () => {
  const response = await AxiosInstance.get("/fetchallusers/");
  return response.data;
};

// get conversation
export const getConversation = async (user_id) => {
  const response = await AxiosInstance.post("/getConversation/", {
    user_id,
  });

  return response.data;
};

// get All conversations
export const getAllConversation = async (user_id) => {
  const response = await AxiosInstance.get("/getAllConversations/");
  return response.data;
};
