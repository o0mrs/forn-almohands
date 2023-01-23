import './css/App.css'
import NavBar from './parts/navbar';
import { useState } from "react";
import {db,Logouta} from '../firebase'
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import { addDoc, Timestamp, collection } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// .replace(/[^0-9]/g, "");
const Add = ()=>{
    let navigate = useNavigate();
    const auth = getAuth();
    const [stage, setstage] = useState();
    const [name, setname] = useState("");
    const [date, setdate] = useState("");
    const [paid, setpaid] = useState();
    const [amount, setamount] = useState();
    const [phone, setphone] = useState("");
    const [work, setwork] = useState("");

    useEffect(()=>{
        if(stage===0){
            onAuthStateChanged(auth,async (user) => {
                if (user) {
                  console.log(user)
                  setstage(1)
                } else {
                    navigate("/login", { replace: true });
                }
              });

        }
    },[])
    if(stage == 0 ){
        return(
            
            <div className="max-w-[100vw]   bga h-[96rem] 
            ">
                            <Helmet>
                <title>Authorization</title>
            </Helmet>
            <div>
            
            <NavBar />
            </div>
            <div>
            
            <div className='grid place-items-center mt-[30vh] text-white w-screen'>
            <ReactLoading type={'bubbles'} color={'#ffffff'} height={'3rem'} width={'3rem'} />

            
            </div>
                    </div>
            
            
            
            </div>
                )
    }else{
        return(
            <div className="max-w-[100vw]   bga h-[96rem] ">
                
                                            <Helmet>
                <title>Records</title>
            </Helmet>
            <div className="navbar ">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52">
        <li onClick={()=>{navigate('/records',{replace:false})}}><a>Records</a></li>
        <li><a>Add new</a></li>
        <li className='text-red-600' onClick={()=>{Logouta(); navigate('/login',{replace:false})}}><a>LogOut</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
  <a className="btn btn-ghost normal-case text-xl" onClick={()=>{navigate('/records',{replace:false})}}>Almohands</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>

  </div>
</div>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className='text-right lg:px-20 md:px-16 sm:px-4 Quicksand'>
       <div className='text-2xl'>
       إضافة سجل
       </div>
<div className='grid mt-5 place-items-center'>
<div className='grid text-right  sm:w-[80vw]'>
        <lable className='pt-2'>الاسم</lable>
        <input className='input h-10 mt-2 ' placeholder='Ahmed' onChange={(e)=>{setname(e.target.value)}}/>
    </div>
    <div className='grid text-right mt-3 sm:w-[80vw]'>
        <lable className='pt-2'>التاريخ</lable>
        <input className='input h-10 mt-2 ' placeholder='DD/MM/YY' onChange={(e)=>{setdate(e.target.value)}}/>
    </div>
    <div className='grid text-right mt-3 sm:w-[80vw]'>
        <lable className='pt-2'>القيمة المدفوعة</lable>
        <input className='input h-10 mt-2 ' placeholder='4' value={paid} onChange={(e)=>{setpaid(e.target.value.replace(/[^0-9]/g, ""))}}/>
    </div>
    <div className='grid text-right mt-3 sm:w-[80vw]'>
        <lable className='pt-2'>القيمة الكاملة</lable>
        <input className='input h-10 mt-2 ' placeholder='10' value={amount} onChange={(e)=>{setamount(e.target.value.replace(/[^0-9]/g, ""))}}/>
    </div>
    <div className='grid text-right mt-3 sm:w-[80vw]'>
        <lable className='pt-2'>الهاتف</lable>
        <input className='input h-10 mt-2 ' placeholder='0782312321' onChange={(e)=>{setphone(e.target.value)}}/>
    </div>
    <div className='grid text-right mt-3 sm:w-[80vw]'>
        <lable className='pt-2'> العمل</lable>
        <textarea className='input h-16 mt-2 text-right' placeholder='استبدال الزجاج الامامي' onChange={(e)=>{setwork(e.target.value)}}/>
    </div>
<div>
    <button onClick={async()=>{

        if(!paid && !amount && !name){
            toast.warn('الرجاء التأكد من تعبئة الاسم و القيمة الكاملة والقيمة المدفوعة', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }else{
            setstage(0)
            const shit =   await addDoc(collection(db, "afran-almohands"), {
                amount: amount,
                date: date,
                name:name,
                paid:paid,
                phone:phone,
                work:work,
                ora:Timestamp.fromDate(new Date()),
                
              });

              if(shit.id){
                setname("")
                setdate("")
                setamount()
                setpaid()
                setphone("")
                setwork("")
                setstage(1)
                toast.success('تم', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
              }else{
                toast.success('501', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
              }

              console.log(shit)
        }

        
    }}className='btn btn-accent btn-active w-32 mt-4'>ADD</button>
</div>
</div>
    </div>
            
            
            </div>
                )
    }

}
export default Add;