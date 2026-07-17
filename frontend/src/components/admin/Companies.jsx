import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className='max-w-6xl mx-auto my-5 md:my-10 px-4 md:px-6'>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-5'>
                <Input
                    className="w-full sm:w-fit"
                    placeholder="Filter by name"
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() => navigate("/admin/companies/create")} className="min-h-[44px] whitespace-nowrap">New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    )
}

export default Companies