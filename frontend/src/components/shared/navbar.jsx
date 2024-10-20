import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error?.response?.data?.message || "An error occurred during logout";
            toast.error(errorMessage);
        }
    };

    return (
        <div className='bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 sticky top-0 z-50 shadow-lg transition-shadow duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo with Link to Homepage */}
                <Link to="/">
                    <h1 className='text-3xl font-extrabold text-gray-800 cursor-pointer'>
                        Job<span className='text-[#F83002]'>Sphere</span>
                    </h1>
                </Link>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <NavLink 
                                        to="/admin/companies" 
                                        className={({ isActive }) => 
                                            `hover:text-[#021bf8] transition-colors ${isActive ? 'font-bold underline decoration-[#021bf8] underline-offset-4' : ''}`
                                        }
                                    >
                                        Companies
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/admin/jobs" 
                                        className={({ isActive }) => 
                                            `hover:text-[#021bf8] transition-colors ${isActive ? 'font-bold underline decoration-[#021bf8] underline-offset-4' : ''}`
                                        }
                                    >
                                        Jobs
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => 
                                            `hover:text-[#021bf8] transition-colors ${isActive ? 'font-bold underline decoration-[#021bf8] underline-offset-4' : ''}`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/jobs" 
                                        className={({ isActive }) => 
                                            `hover:text-[#021bf8] transition-colors ${isActive ? 'font-bold underline decoration-[#021bf8] underline-offset-4' : ''}`
                                        }
                                    >
                                        Jobs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/browse" 
                                        className={({ isActive }) => 
                                            `hover:text-[#021bf8] transition-colors ${isActive ? 'font-bold underline decoration-[#021bf8] underline-offset-4' : ''}`
                                        }
                                    >
                                        Browse
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to="/login">
                                <Button variant="outline" className='text-gray-800 border-gray-800 hover:bg-[#000000] hover:text-white transition-colors'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#000000] text-white hover:bg-[#ffffff] hover:text-black transition-colors">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-gray-800">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} 
                                        alt="@shadcn"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white text-gray-900 rounded-lg shadow-lg">
                                <div className='p-4'>
                                    <div className='flex gap-4 items-center mb-4'>
                                        <Avatar>
                                            <AvatarImage 
                                                src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} 
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-lg'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        {user && user.role === 'student' && (
                                            <Link to="/profile" className='flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors'>
                                                <User2 />
                                                View Profile
                                            </Link>
                                        )}
                                        <button 
                                            onClick={logoutHandler} 
                                            className='flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors'
                                        >
                                            <LogOut />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
