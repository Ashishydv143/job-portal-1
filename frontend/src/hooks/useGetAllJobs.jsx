import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '../../src/components/utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs




// import { setAllJobs } from '@/redux/jobSlice'
// import { JOB_API_END_POINT } from '@/components/utils/constant'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const useGetAllJobs = () => {
//     const dispatch = useDispatch();
//     const { searchedQuery } = useSelector(store => store.job);
//     const token = useSelector(store => store.auth.token); // Assuming token is stored in Redux

//     useEffect(() => {
//         const fetchAllJobs = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Send token in Authorization header
//                     },
//                     withCredentials: true
//                 });
//                 if (res.data.success) {
//                     dispatch(setAllJobs(res.data.jobs));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllJobs();
//     }, [searchedQuery, token, dispatch]);
// }

// export default useGetAllJobs;
