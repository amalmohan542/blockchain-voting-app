import FeatureCard from "@/components/FeatureCard";
import { useEffect } from "react";


export default function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl);
  // Check if the API is running
  useEffect(() => {
    console.log("Checking API status...");
    fetch(`${apiUrl}/election`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API status:", data);
      })
      .catch((err) => {
        console.error("API call failed:", err);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Secure Decentralized Voting
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A blockchain-based voting system ensuring transparency, security, and trust in the democratic process.
          </p>
          <h1>hello</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <FeatureCard
            title="Voter Portal"
            description="Register, authenticate, and cast your vote securely"
            features={[
              "Secure one-time authentication",
              "Anonymous voting",
              "Blockchain-backed security",
              "Verify your vote was counted",
            ]}
            link="/voter/login"
            buttonText="Enter Voter Portal"
          />
          <FeatureCard
            title="Administrator Portal"
            description="Manage elections, candidates, and view results"
            features={[
              "Create and manage elections",
              "Register candidates",
              "Start and stop voting sessions",
              "View real-time statistics and results",
            ]}
            link="/admin/login"
            buttonText="Enter Admin Portal"
          />
        </div>
      </div>
    </div>
  );
}
