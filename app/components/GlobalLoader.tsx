"use client";
import { useLoader } from "@/app/context/LoaderContext";
import React from "react";

const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-400  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};
export default GlobalLoader;
