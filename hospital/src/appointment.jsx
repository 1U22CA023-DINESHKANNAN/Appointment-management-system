import {useState} from 'react';
import axios from 'axios';

export default function Appointment(){
    const [appDetails,setAppDetails] = useState({});
    const [doctorId,setDoctorId] = useState("");
    const [doctors,setDoctors] = useState([])
    const [category,setCategory] = useState("")
    const  [appointmentDate,setAppointmentDate] = useState("")
    const handleCategory= (e)=>{
        setCategory(e.target.dataset.value)
        axios.get('http://localhost:4000/getDoctorName',{params:{category}})
       .then(res=>{setDoctors(res.data.map(item=>item.name))})
       
    }
    const handleDoctor=(e)=>{
        var name = e.target.dataset.value;
        axios.get('http://localhost:4000/getDoctorId',{params:{category,name}})
        .then(res=>setDoctorId(res.data[0].doctor_id))
    }

    const handleChange = (e)=>{
        if(e.target.name == "category"){
            handleCategory(e)
        }
        else if(e.target.name == "doctor"){
            handleDoctor(e)
        }
        else{
            console.log("failed to set category")
        }
        setAppDetails(prev=>({
            ...prev,[e.target.name]:e.target.value || e.target.dataset.value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(appDetails.remember === "on"){
        localStorage.setItem("patient_details",JSON.stringify(appDetails))
        }

        axios.post("http://localhost:4000/setAppointmentData",appDetails,{params:{doctorId}})
        .then(res=>setAppointmentDate(res.data))
    }
    return (
        <div className="flex items-center justify-center p-12">
    <div className="mx-auto w-full max-w-[550px] bg-white">
    <h1 className="font-bold text-2xl flex justify-center m-4">Book An Appointment</h1>
    {appointmentDate && <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p className="font-bold">{appointmentDate}</p>
  <p className="text-sm">Yout Appointment Date Generated!</p>
</div>}
        <form action="#" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Full Name{category}
                </label>
                <input type="text" name="name" id="name" onChange={handleChange} placeholder="Full Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input type="text" name="phone" id="phone" onChange={handleChange} placeholder="Enter your phone number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                            Category
                        </label>
                        <div className="group relative cursor-pointer py-2">

<div className="flex items-center justify-between space-x-5 bg-white px-4">
    <a data-value={appDetails.category}className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4" onClick="">
        {appDetails.category || "Select Category"}
    </a>
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </span>
</div>

<div
    className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

    <a data-value="ent" name="category" onClick={handleChange} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
        Ent
    </a>
    <a data-value="dermo" name="category" onClick={handleChange} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
        dermo
    </a>
    <a data-value="artho" name="category" onClick={handleChange} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
        artho
    </a>


</div>
</div>                    </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                        <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                            Doctor
                        </label>
                        <div className="group relative cursor-pointer py-2">

<div className="flex items-center justify-between space-x-5 bg-white px-4">
    <a value={appDetails.doctor} className="menu-hover my-2 py-2 text-base font-medium text-black lg:mx-4" onClick="">
        {appDetails.doctor || "Select Doctor"}
    </a>
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" className="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    </span>
</div>

<div
    className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
        {doctors.map((item,index)=>{
            return <a data-value={item} key={index} name="doctor" onClick={handleChange} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
            {item}
        </a>
        })}
</div>
</div>                    </div>
                </div>
            </div>

            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="area" onChange={handleChange} id="area" placeholder="Enter area"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="city" onChange={handleChange} id="city" placeholder="Enter city"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="state" id="state" onChange={handleChange} placeholder="Enter state"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="post_code" id="post-code" onChange={handleChange} placeholder="Post Code"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <input type="checkbox" name="remember" id="remember" onChange={handleChange}/>
                <span> Remember Me</span>
                    
            </div>

            <div>
                <input type="submit"
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" value="Register"/>
                    
            </div>
        </form>
    </div>
</div>
    )
}