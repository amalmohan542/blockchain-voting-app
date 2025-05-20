import { createElectionApi, fetchElections } from "@/api/adminApi";

export const getAllEllections = async () => {
  const res = await fetchElections();
  return res.data; // unwrap Axios response
};

export const createElection = async (data: any) => {
  const response = await createElectionApi(data);
  return response.data; // unwrap Axios response
};
