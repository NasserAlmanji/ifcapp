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
export const checkDroneRegistration = (barcode: string) => api.get(`/drones/check?id=${barcode}`);
export const checkDroneSeller = (barcode: string) => api.get(`/drones/check-seller?id=${barcode}`);
export const assignDrones = (distributor: string, items: string[]) => api.post("/drones/assign", { distributor, items });
export const listDrones = () => api.get("/drones/list");
export const checkDroneConfirmation = (barcode: string) => 
    api.get(`/seller/drones/check-confirmation?id=${barcode}`);
  
  export const validateDroneSale = (barcode: string) => 
    api.get(`/seller/drones/check-sale?id=${barcode}`);
  
  export const confirmDrones = (items: string[]) => 
    api.post('/seller/drones/confirm', { items });
  
  export const listSellerDrones = () => api.get('/seller/drones/list');
  
  export const sellDrone = (formData: FormData) => 
    api.post('/seller/drones/sell', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

export default {
  login,
  logout,
  setToken,
  getDroneTypes,
  createDroneType,
  getDistributors,
  createDistributor,
  registerUser,
  registerDrone,
  checkDroneRegistration,
  checkDroneSeller,
  assignDrones,
  listDrones,
  checkDroneConfirmation,
  validateDroneSale,
  confirmDrones,
  sellDrone,
  listSellerDrones
};
