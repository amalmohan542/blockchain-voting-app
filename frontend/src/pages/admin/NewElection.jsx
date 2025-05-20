import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DateTimePicker from "@/components/DateTimePicker";

import { createElection } from "@/services/adminService";

// For TypeScript migration:
// interface FormData {
//   name: string;
// }

const NewElection = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { mutate, error } = useMutation({
    mutationFn: createElection,
    onSuccess: () => {
      queryClient.invalidateQueries(["elections"]);
      navigate("/admin/dashboard");
    },
    onSettled: () => setIsSubmitting(false),
  });

  useEffect(() => {
    console.log("Form Data:", formData, startDate);
  }, [formData, startDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      name: formData.name,
      start_date: startDate
        ? format(new Date(startDate), "yyyy-MM-dd HH:mm:ss")
        : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      end_date: endDate
        ? format(new Date(endDate), "yyyy-MM-dd HH:mm:ss")
        : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    mutate(payload);
    console.log("Sending to backend:", payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to="/admin/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 ">
            Create New Election
          </h1>
          <p className="text-gray-600 ">
            Set up a new election with candidates and voting period
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 md:grid-cols-1">
            <div className="md:col-span-2 md:space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Election Details</CardTitle>
                  <CardDescription>
                    Basic information about the election
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Election Title</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Student Council Election 2023"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="space-y-2">
                    <Label>Voting Period</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                      <DateTimePicker value={startDate} onChange={setStartDate} />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                       <DateTimePicker value={endDate} onChange={setEndDate}/>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm">
                      {error.message || "Failed to create election."}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="border cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="border bg-gray-700 text-white cursor-pointer"
              disabled={
                isSubmitting || !formData.name || !startDate || !endDate
              }
            >
              {isSubmitting ? "Creating..." : "Create Election"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewElection;
