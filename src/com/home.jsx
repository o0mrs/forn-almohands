/* 
Fonts Name (same as the className)
Poppins
roboto

 */
import './css/App.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import NavBar from './parts/navbar';
const Home = ()=>{
let navigate = useNavigate();
let tab = 0
if(tab == 0){
    return(
      
<div className='bga h-screen'>
<NavBar />
<div className='Quicksand grid place-items-center'>
    <div className='glow'>
افران المهندس
    </div>
</div>
</div>
            )
}else{
    return(
        <div>

      </div>
            )
}



}
export default Home;