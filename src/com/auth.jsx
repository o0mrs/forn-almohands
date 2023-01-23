import './css/App.css'
import NavBar from './parts/navbar';
import { useState } from "react";
import {Signinwithemail} from '../firebase'
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

const Auth = ()=>{
    let navigate = useNavigate();
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const [stage, setstage] = useState(0);
    useEffect(()=>{
        if(stage===0){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  console.log(user)

                  navigate("/records", { replace: true });
                  const uid = user.uid;
                } else {
                    setstage(1)

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
            <div className="max-w-[100vw]   bga h-[96rem] 
            ">
                                            <Helmet>
                <title>Login</title>
            </Helmet>
            <div>
            
            <NavBar />
            </div>
            <div>
            
            <div className='grid place-items-center text-white w-screen'>
                    <div className='bg-[#101214] rounded-2xl sm:w-[90vw] md:w-[30vw] pb-12 mt-8'>
            <h1 className='text-center text-white font-bold text-3xl mt-12'>
                Login
            </h1>
            {stage == 0 && (<div>loading</div>)}
            {stage == 1 && (
                <div className='grid mt-7 place-items-center'>
                              <div className='grid mt-7 place-items-center'>
            
                        
                              <label className="input-group mb-5">
                <span className='bg-[#171a1d] w-2'><i class="fa-solid fa-envelope"></i></span>
                
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="input w-[100%] focus:outline-none	 input-active bg-[#171a1d]" />
              </label>

            <label className="input-group ">
                <span className='bg-[#171a1d] w-2'><i className="fa-solid fa-key"></i></span>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className="input w-[100%] focus:outline-none	 input-active bg-[#171a1d]" />
              </label>
            
            <button onClick={()=>{
                setstage(0)
                Signinwithemail(email,password).then((msg)=>{console.log(msg);navigate("/records", { replace: true });}).catch((er)=>{console.log(er); setstage(1)})
            //    setstage(1)
                }} className='btn btn-outline btn-accent mt-7 w-full'>NEXT</button>
            <div className='w-[70%] grid place-items-cdenter mt-3 cursor-pointer'>
    
            </div>
            </div>
            <div className="divider w-[75%]"></div> 
            <div className='border-l-2 pl-2 Quicksand border-yellow-800'>
            This page is only for admins
            </div>
            </div>
            )}
            
                </div>
            
            </div>
                    </div>
            
            
            
            </div>
                )
    }

}
export default Auth;