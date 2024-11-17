import React, { useEffect, useState } from 'react';
import Navbar from '../shared/navbar';
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
import photo from '../../images/rb_739.png';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

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
            console.log(error);
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
                <div className='flex flex-col lg:flex-row items-center justify-between w-full max-w-5xl px-4'>
                    {/* Form Section */}
                    <animated.form
                        onSubmit={submitHandler}
                        style={animationProps}
                        className='w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-600'
                    >
                        <h1 className='text-4xl font-extrabold text-white mb-6 text-center'>
                            Login
                        </h1>
                        <div className='space-y-6'>
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

                            {
                                loading ? (
                                    <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 my-4" disabled>
                                        <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 my-4">
                                        Login
                                    </Button>
                                )
                            }
                            <div className='text-center'>
                                <span className='text-sm text-gray-400'>Don't have an account? <Link to="/signup" className='text-blue-400 hover:underline'>Signup</Link></span>
                            </div>
                        </div>
                    </animated.form>

                    {/* Image Section */}
                    <div className='hidden lg:block w-1/2'>
                        <img src={photo} alt="Your Description" className='h-full object-cover rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
