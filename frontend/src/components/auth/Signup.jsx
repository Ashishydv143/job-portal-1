import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import gif from '../../images/signup.jpg';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
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
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error details:", error.response || error.message);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const animationProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    });

    return (
        <div className='bg-gray-900 min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex items-center justify-center flex-grow'>
                <div className='flex flex-col md:flex-row items-center justify-between max-w-5xl w-full p-4'>
                    <animated.form
                        onSubmit={submitHandler}
                        style={animationProps}
                        className='w-full max-w-md bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg border border-gray-600'
                    >
                        <h1 className='text-3xl md:text-4xl font-extrabold text-white mb-6 text-center'>
                            Register
                        </h1>
                        <div className='space-y-4 md:space-y-6'>
                            <div>
                                <Label className="text-gray-200">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-200">Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="your.email@example.com"
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-200">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="1234567890"
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-200">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="******"
                                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div className='my-4'>
                                <RadioGroup className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r1" className="text-gray-200">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r2" className="text-gray-200">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Label className="text-gray-200">Profile Picture</Label>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer border-gray-600 text-sm"
                                />
                            </div>
                            {
                                loading ? (
                                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 my-4" disabled>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 my-4">
                                        Signup
                                    </Button>
                                )
                            }
                            <div className='text-center'>
                                <span className='text-sm text-gray-400'>Already have an account? <Link to="/login" className='text-blue-400 hover:underline'>Login</Link></span>
                            </div>
                        </div>
                    </animated.form>
                    
                    {/* Add the GIF here */}
                    <div className='hidden md:block ml-10'>
                        <div className='mb-4'>
                            <h2 className='text-xl font-semibold text-gray-300'>
                                Join the Best Job Portal
                            </h2>
                            <p className='text-gray-400'>
                                Register now to connect with top recruiters and find your dream job. 
                                With a user-friendly interface and powerful tools, your job search 
                                will be easier than ever!
                            </p>
                        </div>
                        <img 
                            src={gif} 
                            alt="Signup Animation" 
                            className="max-w-md rounded-lg shadow-lg" // Increased size of image
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
