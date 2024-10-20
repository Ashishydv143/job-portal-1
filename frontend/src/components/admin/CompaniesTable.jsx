import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
            <Table className="bg-white shadow-md rounded-lg">
                <TableCaption className="text-gray-600 font-semibold">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-200">
                        <TableHead className="text-left p-4">Logo</TableHead>
                        <TableHead className="text-left p-4">Name</TableHead>
                        <TableHead className="text-left p-4">Date</TableHead>
                        <TableHead className="text-right p-4">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id} className="hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer">
                            <TableCell className="p-4">
                                <Avatar className="h-12 w-12 border-2 border-gray-300 rounded-full">
                                    <AvatarImage src={company.logo} alt={company.name} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="p-4 font-medium text-gray-800">{company.name}</TableCell>
                            <TableCell className="p-4 text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="p-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="text-gray-600 hover:text-gray-800 transition-colors">
                                        <MoreHorizontal className="w-6 h-6" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md rounded-md p-2">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                        >
                                            <Edit2 className="w-4 text-blue-600" />
                                            <span className="text-gray-700">Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
