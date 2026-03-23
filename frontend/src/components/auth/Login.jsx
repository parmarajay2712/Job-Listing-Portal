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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Network error: Unable to connect to server. Please ensure the backend is running.');
            } else {
                toast.error('An unexpected error occurred during login.');
            }
        } finally {
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
            <form onSubmit={submitHandler} className='w-full max-w-md space-y-6 bg-card border border-border rounded-xl shadow-sm p-8'>
                <div className='space-y-2 text-center'>
                    <h1 className='text-3xl font-bold tracking-tight'>Welcome Back</h1>
                    <p className='text-sm text-muted-foreground'>Enter your credentials to access your account</p>
                </div>

                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
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
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-10" 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </>
                    ) : (
                        'Login'
                    )}
                </Button>

                <div className='text-center text-sm'>
                    <span className='text-muted-foreground'>Don't have an account? </span>
                    <Link to="/signup" className='font-medium text-primary hover:underline transition-colors'>
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login