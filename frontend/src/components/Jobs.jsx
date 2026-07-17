import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const NoJobsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in flex-1">
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
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer min-h-[44px] text-sm md:text-base"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        // Handle salary filtering
        if (searchedQuery.type === 'salary') {
          const jobSalary = Number(job.salary) || 0;
          return jobSalary >= searchedQuery.min && jobSalary <= searchedQuery.max;
        }

        // Handle location filtering
        if (searchedQuery.type === 'location') {
          return job.location.toLowerCase().includes(searchedQuery.value.toLowerCase());
        }

        // Handle industry filtering
        if (searchedQuery.type === 'industry') {
          const title = job.title.toLowerCase();
          const description = job.description.toLowerCase();
          const industry = searchedQuery.value.toLowerCase();
          return title.includes(industry) || description.includes(industry);
        }

        // Handle text search (backward compatibility)
        if (typeof searchedQuery === 'string') {
          return (
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchedQuery.toLowerCase())
          );
        }

        return false;
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto mt-5 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[250px] lg:w-[280px] flex-shrink-0">
          <FilterCard />
        </div>
        {filterJobs.length <= 0 ? (
          <NoJobsFound />
        ) : (
          <div className="flex-1 md:h-[88vh] md:overflow-y-auto pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
