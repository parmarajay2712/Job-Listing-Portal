import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className='max-w-6xl mx-auto my-5 md:my-10 px-4 md:px-6'>
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-5'>
        <Input
          className="w-full sm:w-fit"
          placeholder="Filter by name, role"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/jobs/create")} className="min-h-[44px] whitespace-nowrap">New Jobs</Button>
      </div>
      <AdminJobsTable />
    </div>
  )
}

export default AdminJobs