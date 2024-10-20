import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Sample data for companies
const companies = [
    { name: "Microsoft", logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/microsoft-logo.png" },
    { name: "Amazon", logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/amazon-logo.png" },
    { name: "Apple", logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/apple-logo.png" },
    { name: "Facebook", logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/facebook-logo.png" },
    { name: "Google", logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/google-logo.png" },
    // Add more companies as needed
];

const CompaniesSection = () => {
    return (
        <section className='bg-gradient-to-r from-gray-50 to-gray-100 py-12'>
            <div className='container mx-auto px-4'>
                <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-12'>
                    Our Partner Companies
                </h1>
                <div className='flex flex-wrap justify-center gap-8'>
                    {companies.map((company, index) => (
                        <div key={index} className='flex flex-col items-center bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl'>
                            <img
                                src={company.logo}
                                alt={company.name}
                                className='w-28 h-28 object-contain mb-4 transition-transform duration-300 transform hover:scale-110'
                            />
                            <h2 className='text-xl font-semibold text-gray-700'>{company.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompaniesSection;
