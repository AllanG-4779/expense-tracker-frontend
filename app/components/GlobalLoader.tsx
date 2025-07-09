"use client";
import { useLoader } from "@/app/context/LoaderContext";
import React from "react";

const SkeletonLine = ({ className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const SkeletonCircle = ({ size = "w-10 h-10" }) => (
  <div className={`bg-gray-200 rounded-full animate-pulse ${size}`} />
);

const SkeletonRectangle = ({ className = "w-full h-48" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);
const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return <DashboardSkeleton />;
};
// Sidebar skeleton
const SidebarSkeleton = () => (
  <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
    {/* Logo area */}
    <div className="flex items-center space-x-3">
      <SkeletonCircle size="w-8 h-8" />
      <SkeletonLine className="h-6 w-24" />
    </div>

    {/* Navigation items */}
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="flex items-center space-x-3">
          <SkeletonRectangle className="w-5 h-5" />
          <SkeletonLine className="h-4 w-20" />
        </div>
      ))}
    </div>

    {/* User profile section */}
    <div className="absolute bottom-4 left-4 right-4">
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
        <SkeletonCircle size="w-10 h-10" />
        <div className="flex-1">
          <SkeletonLine className="h-4 w-20 mb-1" />
          <SkeletonLine className="h-3 w-16" />
        </div>
      </div>
    </div>
  </div>
);

// Stats card skeleton
const StatsCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <SkeletonLine className="h-4 w-16 mb-2" />
        <SkeletonLine className="h-8 w-20 mb-1" />
        <SkeletonLine className="h-3 w-24" />
      </div>
      <SkeletonCircle size="w-12 h-12" />
    </div>
  </div>
);

// Chart skeleton
const ChartSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <div className="mb-4">
      <SkeletonLine className="h-6 w-32 mb-2" />
      <SkeletonLine className="h-4 w-48" />
    </div>
    <SkeletonRectangle className="w-full h-64" />
  </div>
);

// Table skeleton
const TableSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    {/* Table header */}
    <div className="px-6 py-4 border-b border-gray-200">
      <SkeletonLine className="h-6 w-32" />
    </div>

    {/* Table content */}
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3">
              <SkeletonLine className="h-4 w-16" />
            </th>
            <th className="px-6 py-3">
              <SkeletonLine className="h-4 w-20" />
            </th>
            <th className="px-6 py-3">
              <SkeletonLine className="h-4 w-18" />
            </th>
            <th className="px-6 py-3">
              <SkeletonLine className="h-4 w-16" />
            </th>
            <th className="px-6 py-3">
              <SkeletonLine className="h-4 w-14" />
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <tr key={row} className="border-b border-gray-200">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <SkeletonCircle size="w-8 h-8" />
                  <SkeletonLine className="h-4 w-24" />
                </div>
              </td>
              <td className="px-6 py-4">
                <SkeletonLine className="h-4 w-32" />
              </td>
              <td className="px-6 py-4">
                <SkeletonRectangle className="w-16 h-6 rounded-full" />
              </td>
              <td className="px-6 py-4">
                <SkeletonLine className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <SkeletonRectangle className="w-8 h-8 rounded" />
                  <SkeletonRectangle className="w-8 h-8 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <SkeletonLine className="h-4 w-32" />
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <SkeletonRectangle key={page} className="w-8 h-8 rounded" />
        ))}
      </div>
    </div>
  </div>
);

// Header skeleton
const HeaderSkeleton = () => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <SkeletonLine className="h-7 w-48 mb-1" />
        <SkeletonLine className="h-4 w-64" />
      </div>
      <div className="flex items-center space-x-4">
        <SkeletonRectangle className="w-10 h-10 rounded-lg" />
        <SkeletonRectangle className="w-10 h-10 rounded-lg" />
        <SkeletonCircle size="w-10 h-10" />
      </div>
    </div>
  </div>
);

// Main dashboard skeleton
const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="relative">
        <SidebarSkeleton />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderSkeleton />

        {/* Dashboard content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <SkeletonLine className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <SkeletonCircle size="w-8 h-8" />
                        <div>
                          <SkeletonLine className="h-4 w-20 mb-1" />
                          <SkeletonLine className="h-3 w-16" />
                        </div>
                      </div>
                      <SkeletonLine className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <TableSkeleton />
        </div>
      </div>
    </div>
  );
};
export default GlobalLoader;
