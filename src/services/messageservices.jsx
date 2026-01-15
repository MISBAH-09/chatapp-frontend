import axios from "axios";
import { getToken } from "./userService";

// messageservices.jsx
export const fetchAllUsers = async () => {
  const token = getToken(); // This is "2b79ba72..."

  const response = await axios.get("http://localhost:8000/fetchallusers/", {
    headers: {
      // Remove "Bearer " prefix
      Authorization: token 
    },
  });

  return response.data;
};
