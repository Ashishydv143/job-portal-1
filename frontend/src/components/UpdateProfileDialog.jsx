import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null // Initialize as null for file
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedUser = res.data.user;
                dispatch(setUser(updatedUser));
                setInput({
                    fullname: updatedUser.fullname || "",
                    email: updatedUser.email || "",
                    phoneNumber: updatedUser.phoneNumber || "",
                    bio: updatedUser.profile?.bio || "",
                    skills: updatedUser.profile?.skills?.join(", ") || "",
                    file: null // Reset file to null
                });
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            setLoading(false);
            setTimeout(() => setOpen(false), 500);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] bg-gray-800 rounded-lg" aria-describedby="dialog-description">
                <DialogHeader>
                    <DialogTitle className="text-white text-2xl font-bold">Update Profile</DialogTitle>
                    <DialogDescription className="text-gray-400" id="dialog-description">
                        Please fill in the fields below to update your profile information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="grid gap-4">
                        {[ 
                            { label: "Name", name: "fullname", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Number", name: "phoneNumber", type: "text" },
                            { label: "Bio", name: "bio", type: "text" },
                            { label: "Skills", name: "skills", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div key={name} className="flex items-center gap-4">
                                <Label htmlFor={name} className="w-1/3 text-gray-300">{label}</Label>
                                <Input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={input[name]}
                                    onChange={changeEventHandler}
                                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        ))}
                        <div className="flex items-center gap-4">
                            <Label htmlFor="file" className="w-1/3 text-gray-300">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full py-2 bg-blue-600 text-white rounded-md flex justify-center items-center" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Update</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
