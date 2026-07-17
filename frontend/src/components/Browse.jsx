import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs = [1, 2,45];

const NoJobsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-6 md:mb-8">
        {/* Animated search icon */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
          <svg
            className="w-10 h-10 md:w-16 md:h-16 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {/* Floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-300 rounded-full animate-float opacity-60"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-300 rounded-full animate-float-delayed opacity-60"></div>
      </div>

      <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 animate-slide-up">
        No Jobs Found
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-8 animate-slide-up-delayed text-sm md:text-base px-4">
        We couldn't find any jobs matching your criteria. Try adjusting your
        filters or search terms.
      </p>

      <div className="flex gap-4 animate-slide-up-delayed-2">
        <div className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          Clear Filters
        </div>
      </div>
    </div>
  );
};

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-6">
      <h1 className="font-bold text-xl my-10">
        Search Results ({allJobs.length})
      </h1>
      {allJobs.length === 0 ? (
        <NoJobsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Browse;
