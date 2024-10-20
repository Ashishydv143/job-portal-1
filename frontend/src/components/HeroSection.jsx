import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mountRef = useRef(null); // Ref for mounting Three.js canvas
    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef();
    const rendererRef = useRef();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    useEffect(() => {
        // Initialize camera and renderer
        cameraRef.current = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        cameraRef.current.position.z = 10;

        rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        
        if (mountRef.current) {
            mountRef.current.appendChild(rendererRef.current.domElement);
        }

        // Create particle system
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // X
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        sceneRef.current.add(particles);

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.001; // Rotate particles
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        animate();

        // Handle resizing
        const handleResize = () => {
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            if (rendererRef.current && mountRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
        };
    }, []);

    return (
        <div className="relative bg-black text-white">
            <div ref={mountRef} className="absolute inset-0 z-0" />
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center gap-5">
                    <span
                        className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#4a00e0] text-white font-semibold text-lg shadow-lg shadow-[#6A38C2]/50 transform transition duration-500 hover:scale-105"
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                        Transforming Job Searches into Success Stories
                    </span>
                    <h1
                        className="text-4xl md:text-5xl font-extrabold text-center transform transition duration-500 hover:scale-105 hover:rotate-2"
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                        Find, Apply & <br />
                        <span className="text-yellow-300">Land Your</span> <br />
                        <span className="text-[#FFDDC1]">Dream Job</span>
                    </h1>
                    <p
                        className="text-lg md:text-xl max-w-2xl text-center mx-auto transform transition duration-500 hover:translate-y-1"
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                        Discover the best job opportunities that match your skills and interests. Start your journey towards your dream job today!
                    </p>
                    <div className="flex max-w-lg mx-auto mt-8 shadow-lg border border-gray-200 rounded-full overflow-hidden transform transition duration-500 hover:scale-105">
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full px-4 py-2 border-none outline-none bg-white text-gray-800"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="bg-[#6A38C2] text-white rounded-r-full flex items-center px-4"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default HeroSection;
