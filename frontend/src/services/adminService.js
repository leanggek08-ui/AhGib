import request from "./request"; // your existing fetch wrapper

export const adminService = {
  getDashboard: () => request("/admin/dashboard"),
};