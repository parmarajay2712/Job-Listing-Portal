import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import {
  Building2,
  Briefcase,
  Users,
  Plus,
  ArrowRight,
  Eye,
  Edit3,
  ChevronRight,
  BarChart2,
  Zap,
  Award,
  TrendingUp,
  MapPin,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LayoutDashboard,
  RefreshCw,
  Star,
  ArrowUpRight,
} from "lucide-react";

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, duration = 1400, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{prefix}{count}{suffix}</span>;
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, gradient, subtext, prefix = "", suffix = "" }) => (
  <div
    className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-default"
    style={{ background: gradient }}
  >
    {/* Decorative shapes */}
    <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-[0.15] bg-white" />
    <div className="absolute -right-2 bottom-2 w-20 h-20 rounded-full opacity-[0.08] bg-white" />
    <div className="absolute top-4 right-16 w-8 h-8 rounded-full opacity-[0.12] bg-white" />

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
        <p className="text-4xl font-black tracking-tight">
          <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="text-white/55 text-xs mt-2 font-medium">{subtext}</p>
      </div>
      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
    </div>
  </div>
);

// ─── Mini Bar Chart (Applications per job) ───────────────────────────────────
const MiniBarChart = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return null;
  const topJobs = jobs.slice(0, 6);
  const max = Math.max(...topJobs.map((j) => j.applications?.length || 0), 1);

  return (
    <div className="flex items-end gap-2 h-20 mt-2">
      {topJobs.map((job, i) => {
        const count = job.applications?.length || 0;
        const pct = Math.max((count / max) * 100, 4);
        const colors = [
          "bg-violet-500",
          "bg-purple-400",
          "bg-indigo-500",
          "bg-blue-500",
          "bg-sky-500",
          "bg-cyan-500",
        ];
        return (
          <div key={job._id} className="flex flex-col items-center flex-1 gap-1" title={`${job.title}: ${count} applicants`}>
            <span className="text-[9px] text-gray-400 font-semibold">{count}</span>
            <div className="w-full rounded-t-lg transition-all duration-700" style={{ height: `${pct}%` }}>
              <div className={`w-full h-full rounded-t-lg ${colors[i % colors.length]} opacity-80 hover:opacity-100 transition-opacity`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Application Pipeline Bar ─────────────────────────────────────────────────
const PipelineBar = ({ accepted, pending, rejected, total }) => {
  if (total === 0) return <div className="text-sm text-gray-400 py-2">No applications yet.</div>;
  const pctA = ((accepted / total) * 100).toFixed(1);
  const pctP = ((pending / total) * 100).toFixed(1);
  const pctR = ((rejected / total) * 100).toFixed(1);
  return (
    <div>
      <div className="flex rounded-full overflow-hidden h-4 mb-3 gap-0.5">
        {accepted > 0 && (
          <div
            className="bg-emerald-500 transition-all duration-1000 rounded-l-full"
            style={{ width: `${pctA}%` }}
            title={`Accepted: ${accepted}`}
          />
        )}
        {pending > 0 && (
          <div
            className="bg-amber-400 transition-all duration-1000"
            style={{ width: `${pctP}%` }}
            title={`Pending: ${pending}`}
          />
        )}
        {rejected > 0 && (
          <div
            className="bg-red-400 transition-all duration-1000 rounded-r-full"
            style={{ width: `${pctR}%` }}
            title={`Rejected: ${rejected}`}
          />
        )}
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Accepted {pctA}%</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Pending {pctP}%</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />Rejected {pctR}%</span>
      </div>
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    accepted: { icon: CheckCircle, cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    rejected: { icon: XCircle, cls: "bg-red-50 text-red-600 border border-red-200" },
    pending: { icon: AlertCircle, cls: "bg-amber-50 text-amber-700 border border-amber-200" },
  };
  const c = cfg[status] || cfg.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${c.cls}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const RecruiterDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [data, setData] = useState({
    companies: [],
    jobs: [],
    totalApplications: 0,
    pipeline: { accepted: 0, pending: 0, rejected: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [now, setNow] = useState(new Date());

  // Clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Greeting
  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const fetchData = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const [cRes, jRes] = await Promise.all([
        axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true }),
        axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true }),
      ]);

      const companies = cRes.data.companies || [];
      const jobs = jRes.data.jobs || [];

      let accepted = 0, pending = 0, rejected = 0;
      jobs.forEach((job) => {
        (job.applications || []).forEach((app) => {
          const s = app.status?.toLowerCase();
          if (s === "accepted") accepted++;
          else if (s === "rejected") rejected++;
          else pending++;
        });
      });

      const totalApplications = accepted + pending + rejected;
      setData({ companies, jobs, totalApplications, pipeline: { accepted, pending, rejected } });
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const hasData = data.companies.length > 0 || data.jobs.length > 0;

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#6A38C2] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full border-4 border-t-[#F83002] border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.7s" }} />
          </div>
          <p className="text-gray-600 font-semibold">Loading dashboard…</p>
          <p className="text-gray-400 text-sm">Fetching your recruitment data</p>
        </div>
      </div>
    );
  }

  const topJobs = data.jobs.slice(0, 5);
  const topCompanies = data.companies.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0529 0%, #3b1a8f 40%, #6A38C2 70%, #c0392b 100%)" }}
      >
        {/* Animated blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #F83002, transparent)" }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #6A38C2, transparent)" }} />
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left: Greeting */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 mb-4">
                <LayoutDashboard className="w-3.5 h-3.5 text-yellow-300" />
                Recruiter Command Center
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {greeting},{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #fbbf24, #f9a8d4, #a78bfa)" }}
                >
                  {user?.fullname?.split(" ")[0] || "Recruiter"}
                </span>{" "}
                👋
              </h1>
              <p className="text-white/55 mt-2 text-sm font-medium">
                {now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                {" · "}
                {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Right: Quick Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/admin/jobs/create")}
                className="flex items-center gap-2 bg-white text-[#6A38C2] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-purple-50 active:scale-95 transition-all shadow-xl shadow-purple-900/30"
              >
                <Plus className="w-4 h-4" />
                Post a Job
              </button>
              <button
                onClick={() => navigate("/admin/companies/create")}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              >
                <Building2 className="w-4 h-4" />
                Add Company
              </button>
              <button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/70 font-semibold text-sm px-3 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
                title="Refresh data"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 -mt-5 pb-16">

        {/* ── Stat Cards ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={Building2}
            label="Companies"
            value={data.companies.length}
            gradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
            subtext="Registered organizations"
          />
          <StatCard
            icon={Briefcase}
            label="Active Jobs"
            value={data.jobs.length}
            gradient="linear-gradient(135deg, #6A38C2 0%, #4f1e99 100%)"
            subtext="Live job postings"
          />
          <StatCard
            icon={Users}
            label="Applications"
            value={data.totalApplications}
            gradient="linear-gradient(135deg, #F83002 0%, #991b1b 100%)"
            subtext="Total received"
          />
          <StatCard
            icon={TrendingUp}
            label="Acceptance Rate"
            value={
              data.totalApplications > 0
                ? Math.round((data.pipeline.accepted / data.totalApplications) * 100)
                : 0
            }
            suffix="%"
            gradient="linear-gradient(135deg, #10b981 0%, #065f46 100%)"
            subtext="Of all applications"
          />
        </div>

        {/* ── Two Column Layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* ── Left: Recent Jobs Table (2/3) ─────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-xl">
                    <Briefcase className="w-5 h-5 text-[#6A38C2]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-900">Recent Job Postings</h2>
                    <p className="text-xs text-gray-400">Your latest positions</p>
                  </div>
                </div>
                <Link
                  to="/admin/jobs"
                  className="flex items-center gap-1 text-[#6A38C2] text-xs font-semibold hover:underline"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Table */}
              {topJobs.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {topJobs.map((job, i) => {
                    const appCount = job.applications?.length || 0;
                    return (
                      <div
                        key={job._id}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors group"
                      >
                        {/* Rank */}
                        <span className="text-xs text-gray-300 font-bold w-5 mr-3 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Logo */}
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mr-4">
                          {job.company?.logo ? (
                            <img src={job.company.logo} alt={job.company?.name} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 className="w-5 h-5 text-[#6A38C2]/50" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#6A38C2] transition-colors">
                            {job.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-400">{job.company?.name || "—"}</span>
                            {job.location && (
                              <span className="flex items-center gap-0.5 text-xs text-gray-400">
                                <MapPin className="w-2.5 h-2.5" />
                                {job.location}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            {job.jobType && (
                              <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                                {job.jobType}
                              </span>
                            )}
                            {job.experience !== undefined && (
                              <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-purple-100">
                                {job.experience}yr exp
                              </span>
                            )}
                            {job.salary && (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-semibold border border-emerald-100">
                                ₹{job.salary}k
                              </span>
                            )}
                          </div>
                        </div>

                        {/* App count */}
                        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-base font-black text-gray-900">{appCount}</p>
                            <p className="text-[10px] text-gray-400 font-medium">applied</p>
                          </div>
                          <Link
                            to={`/admin/jobs/${job._id}/applicants`}
                            className="p-2 rounded-xl border border-gray-100 hover:border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white text-gray-400 transition-all"
                            title="View Applicants"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-[#6A38C2]/30" />
                  </div>
                  <p className="text-gray-700 font-bold text-base">No jobs posted yet</p>
                  <p className="text-gray-400 text-sm mt-1 mb-5">Create your first listing to start receiving applications</p>
                  <button
                    onClick={() => navigate("/admin/jobs/create")}
                    className="flex items-center gap-2 bg-[#6A38C2] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#5b30a6] active:scale-95 transition-all shadow-lg shadow-purple-200"
                  >
                    <Plus className="w-4 h-4" />
                    Post First Job
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Sidebar (1/3) ───────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Application Pipeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                  <BarChart2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Application Pipeline</h3>
                  <p className="text-xs text-gray-400">Status breakdown</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Accepted", count: data.pipeline.accepted, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Pending", count: data.pipeline.pending, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Rejected", count: data.pipeline.rejected, color: "text-red-500", bg: "bg-red-50" },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <p className={`text-xl font-black ${s.color}`}>{s.count}</p>
                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <PipelineBar
                accepted={data.pipeline.accepted}
                pending={data.pipeline.pending}
                rejected={data.pipeline.rejected}
                total={data.totalApplications}
              />
            </div>

            {/* Applications per Job chart */}
            {data.jobs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-gray-900">Apps per Job</h3>
                  <span className="text-[10px] text-gray-400 font-medium">Top {Math.min(data.jobs.length, 6)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">Applications received per listing</p>
                <MiniBarChart jobs={data.jobs} />
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Post a New Job", icon: Briefcase, to: "/admin/jobs/create", color: "text-[#6A38C2]", bg: "bg-purple-50 hover:bg-purple-100", border: "border-purple-100" },
                  { label: "Register Company", icon: Building2, to: "/admin/companies/create", color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100", border: "border-blue-100" },
                  { label: "View All Companies", icon: Globe, to: "/admin/companies", color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100", border: "border-emerald-100" },
                  { label: "Manage Jobs", icon: BarChart2, to: "/admin/jobs", color: "text-orange-600", bg: "bg-orange-50 hover:bg-orange-100", border: "border-orange-100" },
                ].map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${action.bg} ${action.border}`}
                  >
                    <div className={`p-1.5 rounded-lg bg-white shadow-sm ${action.color}`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div
              className="rounded-2xl p-5 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #6A38C2, #F83002)" }}
            >
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-bold">Pro Tip</span>
                </div>
                <p className="text-white/85 text-sm leading-relaxed">
                  Jobs with detailed descriptions and salary ranges receive{" "}
                  <span className="font-bold text-yellow-300">3× more</span> qualified applicants.
                </p>
                <Link
                  to="/admin/jobs/create"
                  className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-white/80 hover:text-white underline underline-offset-2"
                >
                  Post a detailed job <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Companies Grid ──────────────────────────────────────────────────── */}
        {topCompanies.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-black text-gray-900">Your Companies</h2>
                <p className="text-gray-400 text-xs mt-0.5">Manage your registered organizations</p>
              </div>
              <Link
                to="/admin/companies"
                className="flex items-center gap-1 text-[#6A38C2] text-xs font-bold hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topCompanies.map((company) => (
                <div
                  key={company._id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <Building2 className="w-6 h-6 text-[#6A38C2]/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate group-hover:text-[#6A38C2] transition-colors">
                        {company.name}
                      </p>
                      {company.location && (
                        <p className="text-xs text-gray-400 truncate mt-0.5 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 inline" />
                          {company.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {company.website && (
                    <p className="text-xs text-gray-300 truncate mb-4 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {company.website}
                    </p>
                  )}

                  <Link to={`/admin/companies/${company._id}`}>
                    <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-purple-50 transition-all">
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Company
                    </button>
                  </Link>
                </div>
              ))}

              {/* Add Company Card */}
              <Link to="/admin/companies/create">
                <div className="h-full min-h-[160px] bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-3 hover:border-[#6A38C2] hover:bg-purple-50/40 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#6A38C2] transition-colors" />
                  </div>
                  <p className="text-sm font-bold text-gray-400 group-hover:text-[#6A38C2] transition-colors text-center">
                    Add New Company
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* ── Empty State ─────────────────────────────────────────────────────── */}
        {!hasData && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, #ede9fe, #dbeafe)" }}
            >
              <Zap className="w-10 h-10 text-[#6A38C2]" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Welcome to your Recruiter Dashboard!</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">
              Start your recruitment journey by registering your company and posting your first job listing.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/admin/companies/create">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95">
                  <Building2 className="w-4 h-4" />
                  Register Company
                </button>
              </Link>
              <Link to="/admin/jobs/create">
                <button className="flex items-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-200 active:scale-95">
                  <Briefcase className="w-4 h-4" />
                  Post First Job
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
