import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params?.id;
  const dispatch = useDispatch();
  const isEdit = jobId ? true : false;

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    // Clear error when user starts typing
    if (error) setError("");
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    // Clear error when user selects a company
    if (error) setError("");
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  useEffect(() => {
    if (isEdit) {
      const fetchSingleJob = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            const job = res.data.job;
            setInput({
              title: job.title || "",
              description: job.description || "",
              requirements: Array.isArray(job.requirements)
                ? job.requirements.join(",")
                : job.requirements || "",
              salary: job.salary || "",
              location: job.location || "",
              jobType: job.jobType || "",
              experience: job.experienceLevel || "",
              position: job.position?.toString() || "",
              companyId: job.company?._id || "",
            });
            dispatch(setSingleJob(job));
          }
        } catch (error) {
          console.error("Error fetching job:", error);
          toast.error(
            error.response?.data?.message || "Failed to fetch job details",
          );
        } finally {
          setLoading(false);
        }
      };
      fetchSingleJob();
    }
  }, [jobId, isEdit, dispatch]);

  const validateForm = () => {
    // Validate string fields with trim
    const trimmedTitle = input.title?.trim() || "";
    const trimmedDescription = input.description?.trim() || "";
    const trimmedRequirements = input.requirements?.trim() || "";
    const trimmedLocation = input.location?.trim() || "";
    const trimmedJobType = input.jobType?.trim() || "";
    const trimmedCompanyId = input.companyId?.trim() || "";

    // Validate all required string fields
    if (!trimmedTitle) return "Title is required";
    if (!trimmedDescription) return "Description is required";
    if (!trimmedRequirements) return "Requirements are required";
    if (!trimmedLocation) return "Location is required";
    if (!trimmedJobType) return "Job type is required";
    if (!trimmedCompanyId) return "Please select a company";

    // Validate salary - convert to string first, then validate
    const salaryStr = String(input.salary || "").trim();
    if (!salaryStr) return "Salary is required";
    const salaryNum = Number(salaryStr);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      return "Salary must be a valid number greater than 0";
    }

    // Validate experience - convert to string first, then validate
    const experienceStr = String(input.experience || "").trim();
    if (!experienceStr) return "Experience level is required";
    const experienceNum = Number(experienceStr);
    if (isNaN(experienceNum) || experienceNum < 0) {
      return "Experience level must be a valid number";
    }

    // Validate position - convert to string first, then validate
    const positionStr = String(input.position || "").trim();
    if (!positionStr) return "Number of positions is required";
    const positionNum = Number(positionStr);
    if (isNaN(positionNum) || positionNum <= 0) {
      return "Number of positions must be greater than 0";
    }

    return null; // No errors
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Clear previous error
    setError("");
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      let res;
      
      // Prepare payload with properly typed and trimmed values
      const payload = {
        title: String(input.title).trim(),
        description: String(input.description).trim(),
        requirements: String(input.requirements).trim(),
        salary: Number(String(input.salary).trim()),
        location: String(input.location).trim(),
        jobType: String(input.jobType).trim(),
        experience: Number(String(input.experience).trim()),
        position: Number(String(input.position).trim()),
        companyId: String(input.companyId).trim()
      };

      if (isEdit) {
        res = await axios.put(
          `${JOB_API_END_POINT}/update/${jobId}`,
          { ...payload, jobId },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          },
        );
      } else {
        res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full my-5 px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <div className="flex items-center gap-4 mb-5">
          <Button
            onClick={() => navigate("/admin/jobs")}
            variant="outline"
            className="flex items-center gap-2"
          >
            ← Back
          </Button>
          <h1 className="font-bold text-xl">
            {isEdit ? "Edit Job" : "Post New Job"}
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="p-4 sm:p-6 md:p-8 border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                min="1"
                step="1"
              />
            </div>
            <div>
              <Label>Company</Label>
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => {
                        return (
                          <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded my-3">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          {loading ? (
            <Button className="w-full my-4" disabled>
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {isEdit ? "Update Job" : "Post New Job"}
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
