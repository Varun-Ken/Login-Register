import React from "react";
import dashboardImage from "../assets/static.jpg";

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg border-2">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-xl text-center text-gray-700 mb-6">
          Hello, {user?.email || "User"}!!!
        </p>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 text-center">
            You have successfully logged into your account.
          </p>
        </div>
        <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
          <img
            src={dashboardImage}
            alt="Dashboard UI"
            className="w-full h-auto object-cover"
            style={{ maxHeight: "500px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
