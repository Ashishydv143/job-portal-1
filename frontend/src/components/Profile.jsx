import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';
import Loader from './Loader'; // Import the Loader component
import './Profile.css';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        console.log("Current user from Redux:", user); // Log current user
    }, [user]); // Log whenever user changes

    const handleOpenDialog = () => {
        setLoading(true); // Set loading to true when opening dialog
        setOpen(true);
        setLoading(false); // Set loading to false after opening
    };

    const handleCloseDialog = () => {
        setLoading(true); // Set loading to true when closing dialog
        setOpen(false);
        setLoading(false); // Set loading to false after closing
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {loading && <Loader />} {/* Show loader if loading */}
            <Navbar />
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg border border-gray-700 rounded-xl my-8 p-6">
                <div className="flex items-center gap-6 mb-6">
                    <Avatar className="h-32 w-32 border-2 border-gray-600">
                        <AvatarImage 
                            src={user?.profile?.profilePhoto || "https://media.istockphoto.com/id/1292991881/photo/the-more-you-know-the-more-your-business-grows.jpg?s=2048x2048&w=is&k=20&c=wgkxUyB-8SLQKSkt44783IzKQL_bok8Y_EZUxcA1J1g="} 
                            alt="profile" 
                        />
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold text-white" data-text={user?.fullname}>
                            {user?.fullname}
                        </h1>
                        <p className="text-gray-300 mt-2">{user?.profile?.bio}</p>
                        <Button 
                            onClick={handleOpenDialog}  // Use new handler for opening dialog
                            className="mt-4 bg-gray-600 text-white hover:bg-gray-500" 
                            variant="outline"
                        >
                            <Pen className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <Mail className="text-blue-400" />
                        <span className="text-gray-300">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Contact className="text-green-400" />
                        <span className="text-gray-300">{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold text-white mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {
                            user?.profile?.skills.length ? 
                            user.profile.skills.map((item, index) => 
                                <Badge key={index} className="text-gray-300 bg-gray-600">{item}</Badge>
                            ) 
                            : <span className="text-gray-400">NA</span>
                        }
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <Label className="text-md font-semibold text-white mb-2">Resume</Label>
                    {
                        user?.profile?.resume ? 
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={user.profile.resume} 
                            className="text-blue-400 hover:underline"
                        >
                            {user.profile.resumeOriginalName || 'Download Resume'}
                        </a> 
                        : <span className="text-gray-400">NA</span>
                    }
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-blue-800 shadow-lg rounded-xl my-8 p-6">
                <h1 className="text-2xl font-bold text-white mb-6">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={handleCloseDialog} /> {/* Update handler to close dialog */}
        </div>
    );
}

export default Profile;
