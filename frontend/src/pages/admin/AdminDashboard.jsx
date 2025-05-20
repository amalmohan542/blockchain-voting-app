import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogOut, Plus, Settings, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import ElectionOverView from "@/components/ElectionOverView";
import ElectionManagement from "@/components/ElectionManagement";


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <header className="border-b bg-white shadow-sm ">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 ">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 ">
                Election Management System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold text-gray-900 ">
            Elections Overview
          </h2>
          <Button asChild>
            <Link to="/admin/elections/new">
              <Plus className="mr-2 h-4 w-4" />
              Create New Election
            </Link>
          </Button>
           <Button asChild>
            <Link to="/admin/candidate/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate to Election
            </Link>
          </Button>
        </div>

        <ElectionOverView />

        <ElectionManagement />
      </main>
    </div>
  );
};

export default AdminDashboard;
