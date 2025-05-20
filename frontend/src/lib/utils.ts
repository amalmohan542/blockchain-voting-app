import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



// Format date for display
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Calculate participation rate
const getParticipationRate = (election) => {
  return ((election.votesCount / election.registeredVoters) * 100).toFixed(1)
}

export { cn, formatDate, getParticipationRate }