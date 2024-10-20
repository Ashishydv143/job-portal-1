import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-16 px-4 bg-gray-900'>
            <h1 className='text-4xl font-bold text-center mb-8 text-white'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 
                        ? <div className='col-span-full text-center text-lg text-gray-400'>No Jobs Available</div> 
                        : allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                }
            </div>
        </div>
    );
}

export default LatestJobs;
