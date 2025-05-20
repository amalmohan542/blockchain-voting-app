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
import { Textarea } from "@/components/ui/textarea";

import { createElection } from "@/services/adminService";

const NewElection = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: createElection,
    onSuccess: () => {
      queryClient.invalidateQueries(["elections"]);
      navigate("/admin/dashboard");
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    const payload = {
      name: formData.name,
      description: formData.description,
      start_date: formData.startDate || format(new Date(), "yyyy-MM-dd"),
      end_date: formData.endDate || format(new Date(), "yyyy-MM-dd"),
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide details about this election"
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Voting Period</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        {/* <DateTimePicker
                          value={formData.startDate}
                          onChange={(value) =>
                            handleDateChange("startDate", value)
                          }
                        /> */}
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        {/* <DateTimePicker
                          value={formData.endDate}
                          onChange={(value) =>
                            handleDateChange("endDate", value)
                          }
                        /> */}
                      </div>
                    </div>
                  </div>
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
              disabled={isSubmitting}
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
