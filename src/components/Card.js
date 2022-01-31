import React from 'react';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react/cjs/react.development';

function Card() {
   const [cookies, setCookie] = useCookies(['user']);
   const [valuePresent,setValuePresent]=useState(false);


   useEffect(() => {
      if(typeof(cookies.Division)!=='undefined'){
      console.log(cookies.District, '- Has changed');
      console.log(cookies.Division, '- Has changed');
      setValuePresent(true);
      }
  },[cookies.District,cookies.Division]) // <-- here put the parameter to listen

  return (<>

<section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
   <div className="container">
       <div className='flex-row'>
           <div className='font-bold text-3xl rounded-lg ml-5 mb-10'>
               List of Attractions
           </div>
           <hr className=' mb-10'></hr>
       </div>
      <div className="flex flex-wrap -mx-5 ">
         <div className="w-full md:w-1/2 xl:w-1/3 px-4 border-2 mx-10">
            <div className="bg-white rounded-lg overflow-hidden mb-20">
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-left">
                  <h3 className='text-blue-700 font-bold text-lg'>
                      Manikganj
                  </h3>
                  <h3 className='text-red-600 font-bold text-lg'>
                      Harirampur
                  </h3>
                  <button className='text-blue-600 bg-blue-200 rounded font-bold py-2 px-40 mt-20'>Edit</button>
               </div>
            </div>
         </div>
         <div className="w-full md:w-1/2 xl:w-1/3 px-4 border-2 mx-10">
            <div className="bg-white rounded-lg overflow-hidden mb-20">
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-left">
                  <h3 className='text-blue-700 font-bold text-lg'>
                      Manikganj
                  </h3>
                  <h3 className='text-red-600 font-bold text-lg'>
                      Harirampur
                  </h3>
                  <button className='text-blue-600 bg-blue-200 rounded font-bold py-2 px-40 mt-20'>Edit</button>
               </div>
            </div>
         </div>

         {valuePresent?(<div className="w-full md:w-1/2 xl:w-1/3 px-4 border-2 mx-10 mt-10">
            <div className="bg-white rounded-lg overflow-hidden mb-20">
               <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-left">
                  <h3 className='text-blue-700 font-bold text-lg'>
                   {cookies.Division.label}
                  </h3>
                  <h3 className='text-red-600 font-bold text-lg'>
                  {cookies.District.display}
                  </h3>
                  <button className='text-blue-600 bg-blue-200 rounded font-bold py-2 px-40 mt-20'>Edit</button>
               </div>
            </div>
         </div>):(<div></div>)}


      </div>
   </div>
</section>
  
  
  </>);
}

export default Card;
