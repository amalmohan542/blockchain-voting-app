import { createElectionApi, fetchElections } from "@/api/adminApi";

export const getAllElections = async () => {
  const res = await fetchElections();
  return res.data;
};

export const createElection = async (data: any) => {
  const response = await createElectionApi(data);
  return response.data;
};
