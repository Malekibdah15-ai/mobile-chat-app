import axios from "axios"


const API_URL = "https://mobile-chat-app-mj4m9.sevalla.app/api"
if (!API_URL) {
  console.error("VITE_API_URL environment variable is not set");
}


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api