import axios from "axios";

const API_BASE_URL = "http://localhost:8090/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

const storedToken = localStorage.getItem("token");
if (storedToken) {
  setToken(storedToken);
}

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post("/auth/login", credentials);
  setToken(response.data.token);
  return response;
};

export const registerUser = async (userData: { username: string; password: string; role: string; organization: string }) => {
    return api.post("/auth/register", userData);
};

export const logout = () => {
  setToken(null);
};

export const getDroneTypes = () => api.get("/drone-types");
export const createDroneType = (type: string) => api.post("/drone-types", { type });
export const getDistributors = () => api.get("/distributors");
export const createDistributor = (name: string) => api.post("/distributors", { name });
export const registerDrone = (type: string, items: string[]) => api.post("/drones/register", { type, items });

export default {
  login,
  logout,
  setToken,
  getDroneTypes,
  createDroneType,
  getDistributors,
  createDistributor,
  registerUser,
  registerDrone
};
