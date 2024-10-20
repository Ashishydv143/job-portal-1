import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from './utils/constant.js';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-6 bg-gradient-to-r from-[#f0f4f8] via-[#e0e6ed] to-[#cfd8e0] shadow-lg rounded-lg'>
            <div className='flex items-center justify-between border-b-2 border-gray-300 pb-4 mb-6'>
                <div>
                    <h1 className='font-bold text-2xl mb-2 transition-transform transform hover:scale-105 duration-300'>
                        {singleJob?.title}
                    </h1>
                    <div className='flex items-center gap-2'>
                        <Badge className='text-blue-700 font-bold transition-transform transform hover:scale-105 duration-300' variant="ghost">
                            {singleJob?.postion} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold transition-transform transform hover:scale-105 duration-300' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold transition-transform transform hover:scale-105 duration-300' variant="ghost">
                            {singleJob?.salary}LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`transition-colors duration-300 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h2 className='text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4'>
                Job Description
            </h2>
            <div className='space-y-4'>
                <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                    <h3 className='font-semibold text-lg mb-1'>
                        Role: <span className='font-normal text-gray-800'>{singleJob?.title}</span>
                    </h3>
                    <h3 className='font-semibold text-lg mb-1'>
                        Location: <span className='font-normal text-gray-800'>{singleJob?.location}</span>
                    </h3>
                    <h3 className='font-semibold text-lg mb-1'>
                        Description: <span className='font-normal text-gray-800'>{singleJob?.description}</span>
                    </h3>
                    <h3 className='font-semibold text-lg mb-1'>
                        Experience: <span className='font-normal text-gray-800'>{singleJob?.experience} yrs</span>
                    </h3>
                    <h3 className='font-semibold text-lg mb-1'>
                        Salary: <span className='font-normal text-gray-800'>{singleJob?.salary}LPA</span>
                    </h3>
                    <h3 className='font-semibold text-lg mb-1'>
                        Total Applicants: <span className='font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                    </h3>
                    <h3 className='font-semibold text-lg'>
                        Posted Date: <span className='font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
