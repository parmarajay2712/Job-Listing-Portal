import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { Users, ArrowLeft, RefreshCw } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllApplicants = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
        { withCredentials: true }
      );
      dispatch(setAllApplicants(res.data.job));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  const count = applicants?.applications?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0529 0%, #3b1a8f 50%, #6A38C2 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #a78bfa, transparent)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">
                  Applicants
                </h1>
                <p className="text-white/50 text-sm mt-0.5">
                  {loading ? "Loading…" : `${count} application${count !== 1 ? "s" : ""} received`}
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchAllApplicants(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-4 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200" />
              <div className="absolute inset-0 rounded-full border-4 border-t-[#6A38C2] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
          </div>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;