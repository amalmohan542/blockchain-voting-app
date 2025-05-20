import axiosInstance from "./axiosInstance";

export const fetchElections = () => axiosInstance.get("/election");

export const createElectionApi = (data: any) =>
  axiosInstance.post("/election", data);
