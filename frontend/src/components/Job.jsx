import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-4 md:p-6 lg:p-8 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105'>
            <div className='flex flex-col sm:flex-row items-center justify-between'>
                <p className='text-sm text-gray-400 mb-2 sm:mb-0'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full hover:bg-gray-600 transition-colors duration-300" size="icon">
                    <Bookmark className='text-gray-300 hover:text-[#7209b7]' />
                </Button>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4 my-4'>
                <Button className="p-2 rounded-full border border-gray-700 hover:border-[#7209b7] transition-colors duration-300" variant="outline" size="icon">
                    <Avatar className='w-12 h-12 border-2 border-gray-700 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300'>
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-xl text-white mb-1'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-xl text-white my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-300'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-3 mt-4'>
                <Badge className='text-blue-400 font-bold transition-transform transform hover:scale-105 bg-gray-700 p-1 rounded-full'>{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold transition-transform transform hover:scale-105 bg-gray-700 p-1 rounded-full'>{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold transition-transform transform hover:scale-105 bg-gray-700 p-1 rounded-full'>{job?.salary}LPA</Badge>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className='w-full sm:w-auto border border-[#7209b7] text-[#7209b7] hover:bg-[#7209b7] hover:text-white transition-colors duration-300'
                >
                    Details
                </Button>
                <Button 
                    className="w-full sm:w-auto bg-[#7209b7] text-white hover:bg-[#5f32ad] transition-colors duration-300"
                >
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
