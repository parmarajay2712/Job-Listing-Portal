import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  FileText,
  User,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = {
    accepted: {
      cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    rejected: {
      cls: "bg-red-50 text-red-600 border border-red-200",
      dot: "bg-red-500",
    },
    pending: {
      cls: "bg-amber-50 text-amber-700 border border-amber-200",
      dot: "bg-amber-400",
    },
  };
  const c = cfg[status?.toLowerCase()] || cfg.pending;
  const label = status
    ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
    : "Pending";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {label}
    </span>
  );
};

// ── Avatar placeholder ────────────────────────────────────────────────────────
const AvatarPlaceholder = ({ name, deleted = false }) => {
  const initials = name && name !== "Deleted Account"
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
      deleted
        ? "bg-gradient-to-br from-red-300 to-red-400"
        : "bg-gradient-to-br from-purple-400 to-indigo-500"
    }`}>
      {initials}
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const [updatingId, setUpdatingId] = useState(null);

  const statusHandler = async (status, id) => {
    setUpdatingId(id);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(`Application marked as ${status}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const applications = applicants?.applications || [];

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-100">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-[#6A38C2]/30" />
        </div>
        <p className="text-gray-700 font-bold text-base">No applicants yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Applications will appear here once candidates apply
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
      <Table>
        <TableCaption className="pb-4 text-gray-400 text-xs">
          {applications.length} applicant{applications.length !== 1 ? "s" : ""}{" "}
          for this position
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50/80 border-b border-gray-100">
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-5">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Applicant
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Contact
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3">
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Resume
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Applied On
              </div>
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3">
              Status
            </TableHead>
            <TableHead className="text-xs font-bold text-gray-500 uppercase tracking-wider py-3 text-right pr-5">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((item) => {
            // ── Safe null guards ──────────────────────────────────────────────
            const applicant = item?.applicant || null;
            const fullname = applicant?.fullname || "Deleted Account";
            const email = applicant?.email || "—";
            const phone = applicant?.phoneNumber || "—";
            const resume = applicant?.profile?.resume || null;
            const resumeName =
              applicant?.profile?.resumeOriginalName || "Resume";
            // Always use the Application's own createdAt — it's always present
            const formattedDate = item?.createdAt
              ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—";
            const status = item?.status || "pending";
            const isUpdating = updatingId === item?._id;

            return (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50/70 transition-colors border-b border-gray-50 last:border-0"
              >
                {/* Applicant */}
                <TableCell className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <AvatarPlaceholder name={fullname} deleted={!applicant} />
                    <div>
                      <span className="font-semibold text-gray-900 text-sm block">
                        {fullname}
                      </span>
                      {!applicant && (
                        <span className="text-[10px] text-red-400 font-medium">
                          Account no longer exists
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="py-4 text-sm text-gray-600">
                  {email}
                </TableCell>

                {/* Contact */}
                <TableCell className="py-4 text-sm text-gray-600">
                  {phone}
                </TableCell>

                {/* Resume */}
                <TableCell className="py-4">
                  {resume ? (
                    <a
                      href={resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#6A38C2] text-xs font-semibold hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {resumeName}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-xs font-medium">
                      Not uploaded
                    </span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="py-4 text-sm text-gray-500">
                  {formattedDate}
                </TableCell>

                {/* Status */}
                <TableCell className="py-4">
                  <StatusBadge status={status} />
                </TableCell>

                {/* Action */}
                <TableCell className="py-4 text-right pr-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        disabled={isUpdating}
                        className="p-2 rounded-xl border border-gray-100 hover:border-[#6A38C2] hover:bg-purple-50 text-gray-400 hover:text-[#6A38C2] transition-all disabled:opacity-50"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2" align="end">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">
                        Update Status
                      </p>
                      {shortlistingStatus.map((s) => (
                        <button
                          key={s}
                          onClick={() => statusHandler(s, item?._id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                            s === "Accepted"
                              ? "hover:bg-emerald-50 hover:text-emerald-700 text-gray-600"
                              : "hover:bg-red-50 hover:text-red-600 text-gray-600"
                          }`}
                        >
                          {s === "Accepted" ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          {s}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
