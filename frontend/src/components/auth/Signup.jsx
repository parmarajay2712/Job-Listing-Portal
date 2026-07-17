import React, { useEffect, useState } from 'react'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Network error: Unable to connect to server. Please ensure the backend is running.');
            } else {
                toast.error('An unexpected error occurred during signup.');
            }
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center justify-center min-h-screen px-4 bg-background'>
            <form onSubmit={submitHandler} className='w-full max-w-md space-y-6 bg-card border border-border rounded-xl shadow-sm p-5 sm:p-8'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Create Account</h1>
                    <p className='text-sm text-muted-foreground'>Enter your details to get started</p>
                </div>

                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            id="fullname"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="h-10"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                            className="h-10"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="h-10"
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="h-10"
                        />
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-3'>
                            <Label>Role</Label>
                            <RadioGroup className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="role-student"
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="role-student" className="cursor-pointer">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="role-recruiter"
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="role-recruiter" className="cursor-pointer">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="profile">Profile Photo</Label>
                            <Input
                                id="profile"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer h-10"
                            />
                        </div>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-10 min-h-[44px]" 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </>
                    ) : (
                        'Sign up'
                    )}
                </Button>

                <div className='text-center text-sm'>
                    <span className='text-muted-foreground'>Already have an account? </span>
                    <Link to="/login" className='font-medium text-primary hover:underline transition-colors'>
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup