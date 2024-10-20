import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transition-transform transform hover:scale-105'>
            <h1 className='font-bold text-2xl text-white mb-4'>Filter Jobs</h1>
            <hr className='border-gray-600 mb-4' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-6'>
                            <h2 className='font-semibold text-xl text-gray-300 mb-2'>{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className='flex items-center space-x-3 my-2'>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className='form-radio h-5 w-5 text-indigo-500 border-gray-600 checked:bg-indigo-600 checked:border-indigo-600 transition-colors duration-150 ease-in-out' 
                                            />
                                            <Label htmlFor={itemId} className='text-gray-300 cursor-pointer hover:text-indigo-500 transition-colors duration-150'>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
