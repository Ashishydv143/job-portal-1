import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'; // Ensure proper import paths
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice'; // Ensure this path is correct

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle job category selection
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query)); // Dispatch the search query
        navigate("/browse"); // Navigate to the browse page
    };

    return (
        <div >
            <Carousel className="w-full max-w-4xl mx-auto my-16 relative">
                <CarouselContent className="flex gap-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem 
                                key={index} // Unique key for each mapped element
                                className="flex items-center justify-center"
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="bg-white text-[#6A38C2] rounded-full py-2 px-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-[#4a00e0] p-2 rounded-full cursor-pointer hover:bg-[#6A38C2] transition-colors" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-[#4a00e0] p-2 rounded-full cursor-pointer hover:bg-[#6A38C2] transition-colors" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
