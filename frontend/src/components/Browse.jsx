import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className='bg-gray-900 min-h-screen text-gray-300'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-12 p-6 bg-gray-800 shadow-lg rounded-xl'>
                <h1 className='text-3xl font-bold mb-8'>
                    Search Results ({allJobs.length})
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {
                        allJobs.length === 0
                        ? <div className='col-span-full text-center text-gray-400'>No jobs available.</div>
                        : allJobs.map((job) => (
                            <div key={job._id} className='transform transition-transform hover:scale-105 hover:shadow-2xl rounded-lg p-6 bg-gray-700 shadow-md cursor-pointer hover:translate-y-[-5px] hover:rotate-[1deg] duration-300 ease-in-out'>
                                <Job job={job} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
