import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-6 rounded-lg shadow-lg bg-gray-800 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:translate-y-[-5px] hover:rotate-[1deg] duration-300 ease-in-out'
        >
            <div className='mb-4'>
                <h1 className='font-semibold text-xl text-white'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-400'>Location: India</p>
            </div>
            <div className='mb-4'>
                <h1 className='font-bold text-xl text-white mb-2'>{job?.title}</h1>
                <p className='text-sm text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
                <Badge className={'text-blue-200 font-semibold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-semibold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-semibold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCards;
