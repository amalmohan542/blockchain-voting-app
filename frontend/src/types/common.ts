export interface StatusBadgeProps {
    status: "active" | "upcoming" | "ended" | string;
  }

export interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
}
export interface Election {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  totalVoters: number;
  registeredVoters: number;
  votesCount: number;
  candidates: Candidate[];
}