import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const mainApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

mainApi.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return Promise.reject(new Error("No token"));
    }

    req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  (error) => Promise.reject(error)
);

mainApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.log("HELLO");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { authApi, mainApi };
