import './css/App.css'
import NavBar from './parts/navbar';
import { useState } from "react";
import {db,Logouta} from '../firebase'
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import { collection,onSnapshot, getDocs,query, orderBy, limit } from "firebase/firestore"; 


const Records = ()=>{
    let navigate = useNavigate();
    const auth = getAuth();
    const [list, setlist] = useState([]);
    const [stage, setstage] = useState(0);
    const [info, setmoreinfo] = useState({});

    useEffect(()=>{
        if(stage===0){
            onAuthStateChanged(auth,async (user) => {
                if (user) {
                  console.log(user)
                  const citiesRef = collection(db, "afran-almohands");
                  const q = query(citiesRef, orderBy("ora", "desc"), limit(15));
                  onSnapshot(q, (snapshot) => {
    
                    const newData = snapshot.docs.map(doc => doc.data());
                    setlist(newData);       
                    console.log( newData);
                    setstage(1)
                  });
                  console.log(q)
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
      <li onClick={()=>{navigate('/add',{replace:false})}}><a>Add</a></li>
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

    <div className='text-right lg:px-20 md:px-16 sm:px-4 Quicksand'>
       <div className='text-2xl'>
       السجلات
       </div>
       <div className="overflow-x-auto">
  <table className="table bg-base-300 mt-4 w-full">
 
    <thead className='bg-base-300'>
      <tr>

      <th>الاسم</th>
      <th>التاريخ</th>
      <th>المتبقي</th>
      <th>القيمة المدفوعة</th>
      <th>القيمة الكاملة</th>
      <th>الهاتف</th>
     <th>العمل</th>
     <th>more</th>















      </tr>
    </thead>
    <tbody>

        {list.map((gf,i)=>{
return(
    <>
     <tr className="hover  bg-base-300">
     <th>{gf.name && (gf.name) }{!gf.name && ('لا يوجد')}</th>
     <td>{gf.date && (gf.date) }{!gf.date && ('لا يوجد')}</td>
     <td>{gf.amount - gf.paid}</td>
     <td>{gf.paid && (gf.paid) }{!gf.paid && ('لا يوجد')}</td>
     <td>{gf.amount && (gf.amount) }{!gf.amount && ('لا يوجد')}</td>
     <td>{gf.phone && (gf.phone) }{!gf.phone && ('لا يوجد')}</td>
    <th>{gf.work && (gf.work) }{!gf.work && ('لا يوجد')} </th>
    <th onClick={()=>{setmoreinfo(gf)}}><label htmlFor="my-modal" className="text-blue-400"><a>more</a></label></th>




  
      </tr>
      </>)
        })}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box bg-base-300">
    <h3 className="font-bold text-lg Quicksand">MORE INFO</h3>
    {info && (<>
        <p className="py-4">{info.name}</p>
        <div className="grid text-right">
<div className='grid'> 
  <label className="" > الهاتف:</label>
   {info.phone}
</div>
<div className='grid'> 
  <label className="" > التاريخ:</label>
   {info.date}
</div>
<div className='grid'> 
  <label className="" > القيمة:</label>
  {info.amount}
</div>
<div className='grid'> 
  <label className="" > المدفوع:</label>
  {info.paid}
</div>
<div className='grid'> 
  <label className="" > العمل:</label>
  {info.work}
</div>
<div>

</div>

        </div>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn text-white">done!</label>
    </div>
    </>)}

  </div>
</div>
      {/* <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
 
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr> */}
    </tbody>
  </table>

</div>
<div className='grid place-items-center mt-52'>
    <button className='mt-6 btn btn-active' onClick={()=>{
        const citiesRef = collection(db, "afran-almohands");
        const q = query(citiesRef, orderBy("ora"), limit(100));
        onSnapshot(q, (snapshot) => {
      
          const newData = snapshot.docs.map(doc => doc.data());
          setlist(newData);       
          console.log( newData);
          setstage(1)
        });
        console.log(q)
    }}>LOAD 100</button>
        <button className='mt-6 btn btn-active' onClick={()=>{
        const citiesRef = collection(db, "afran-almohands");
        const q = query(citiesRef, orderBy("ora"), limit(200));
        onSnapshot(q, (snapshot) => {
      
          const newData = snapshot.docs.map(doc => doc.data());
          setlist(newData);       
          console.log( newData);
          setstage(1)
        });
        console.log(q)
    }}>LOAD 200</button>
        <button className='mt-6 btn btn-active' onClick={()=>{
        const citiesRef = collection(db, "afran-almohands");
        const q = query(citiesRef, orderBy("ora"), limit(300));
        onSnapshot(q, (snapshot) => {
      
          const newData = snapshot.docs.map(doc => doc.data());
          setlist(newData);       
          console.log( newData);
          setstage(1)
        });
        console.log(q)
    }}>LOAD 300</button>
    <button className='mt-6 btn btn-active' onClick={()=>{
        const citiesRef = collection(db, "afran-almohands");
        const q = query(citiesRef, orderBy("ora"), limit(500));
        onSnapshot(q, (snapshot) => {
      
          const newData = snapshot.docs.map(doc => doc.data());
          setlist(newData);       
          console.log( newData);
          setstage(1)
        });
        console.log(q)
    }}>LOAD 500</button>
    {/* <button onClick={()=>{
        const citiesRef = collection(db, "afran-almohands");
        const q = query(citiesRef, orderBy("ora"), limit(1000));
        onSnapshot(q, (snapshot) => {
      
          const newData = snapshot.docs.map(doc => doc.data());
          setlist(newData);       
          console.log( newData);
          setstage(1)
        });
        console.log(q)
    }}>LOAD 1000</button> */}
  </div>
    </div>
            
            
            </div>
                )
    }

}
export default Records;