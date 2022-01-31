import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Select, {components} from 'react-select';
import { Fragment} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { district,division } from '../data';

function Sidebar() {
  const [selected_district, setSelected_district] = useState(district[0]);
  const[selected_division,setSelected_division]=useState(division[0]);
  const [isChecked_pack1, setIsChecked_pack1] = useState(false);
  const [isChecked_pack2, setIsChecked_pack2] = useState(false);
  const [isChecked_pack3, setIsChecked_pack3] = useState(false);
  const [showSidebar,setShowSidebar]=useState(false);
  const [inputList, setInputList] = useState([{place:''}]);
  const [cookies, setCookie] = useCookies(['user']);


    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
  
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
  
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, {place:''}]);
    };

    const handle = () => {
      setCookie('Division', selected_division, { path: '/' });
      setCookie('District', selected_district, { path: '/' });
   };

   const handleOnChange_pack1 = () => {
    setIsChecked_pack1(!isChecked_pack1);
  };

  const handleOnChange_pack2 = () => {
    setIsChecked_pack2(!isChecked_pack2);
  };


  const handleOnChange_pack3 = () => {
    setIsChecked_pack3(!isChecked_pack3);
  };

  return (<>
{
    showSidebar?(
    <button id="back-button" className="bg-blue-200 hover:bg-blue-300 text-blue-600 border-blue-600 font-bold py-2 px-4 rounded fixed top-20 right-10 z-50"
    onClick={() => setShowSidebar(!showSidebar)}>
         Back →
    </button>
    ):(
        <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="bg-blue-600 w-[15vw] h-[3vw] hover:bg-blue-500 text-white border-blue-600 font-bold py-2 px-4 rounded fixed top-20 right-10 z-50"
      >
      +add new place
      </button>
    )
}
<div className={` justify-start overflow-scroll top-0 right-0 w-[25vw] bg-white-600 shadow-2xl  p-10 pl-20 rounded-xl text-black fixed h-full z-40 ${
    showSidebar? "translate-x-0 " : "translate-x-full"}`}>
      <form>


      {/*Search Drop Down*/}
      <div  className='font-bold mt-20 text-black'>Division</div>
      <Select className='mt-5 w-full py-2' placeholder='Type here...' onChange={setSelected_division} 
        options={division.map(opt => ({ label: opt.display, value: opt.display }))}
      />
      {/*Search Drop Down Ends*/}

      {/*Drop Down*/}
      <div  className='font-bold mt-20 text-black'>District</div>
      <Listbox value={selected_district} onChange={setSelected_district}>
        <div className="relative mt-5 py-2 h-12">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded border-2 cursor-default focus:outline outline-offset-2 outline-blue-400 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-blue focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-m">
            <span className="block truncate">{selected_district.display}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {district.map((dis,disIdx) => (
                <Listbox.Option
                  key={disIdx}
                  className={({ active }) =>
                    `${active ? 'text-blue-700 bg-blue-200' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={dis}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {dis.display}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-blue-600' : 'text-blue-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {/*Drop Down Ends*/}

      {/*Dynamic Input*/}
      <div  className='font-bold mt-20 text-black'>Popular Place</div>
      {inputList.map((x, i) => {
        return(
      <div className='group mb-10' key={i}>
      <input placeholder='Add Place' className='w-[16vw] border-2 p-2 mt-5 mr-2 focus:outline outline-offset-2 outline-blue-400 outline-4 rounded' onChange={(e)=>handleInputChange(e,i)}></input>
      {(inputList.length!==1)?<button className='relative rounded-2xl w-10 h-10 border-dashed border-2' onClick={() => handleRemoveClick(i)}>-</button>:''}
      </div>
      )})
      }
      <div className='relative rounded-l w-full h-10 border-dashed border-2 text-center cursor-pointer pt-1' onClick={handleAddClick}>+add another place</div>
      {/*Dynamic Input Ends*/}

      {/*Check List*/}
      <div  className='font-bold mt-20 text-black'>Packages</div>
      <div class="form-check mt-5">
      <div className='check-box flex'>
      <div className='box w-12 h-12 bg-orange-200 mr-10'></div>
      <label class="form-check-label inline-block text-gray-800 mr-10 text-orange-200 font-bold" for="flexCheckChecked">
        Package 1
        <div className='text-black'>300 taka</div>
      </label>
      <input class="form-check-input appearance-none h-4 w-4 ml-10 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1  bg-no-repeat bg-center bg-contain checked:bg-blue-600 ml-2 cursor-pointer" type="checkbox" value="package1" id="flexCheckChecked"  checked={isChecked_pack1} onChange={handleOnChange_pack1}/>
      </div>
      <div className='check-box flex  mt-5'>
      <div className='box w-12 h-12 bg-purple-200 mr-10'></div>
      <label class="form-check-label inline-block text-gray-800 mr-10 text-purple-200 font-bold" for="flexCheckChecked">
        Package 2
        <div className='text-black'>300 taka</div>
      </label>
      <input class="form-check-input appearance-none h-4 w-4 ml-10 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1  bg-no-repeat bg-center bg-contain checked:bg-blue-600 checked:bg-blue-600 ml-2 cursor-pointer" type="checkbox" value="package2" id="flexCheckChecked" checked={isChecked_pack2} onChange={handleOnChange_pack2}/>
      </div>
      <div className='check-box flex  mt-5'>
      <div className='box w-12 h-12 bg-blue-200 mr-10'></div>
      <label class="form-check-label inline-block text-gray-800 mr-10 text-blue-200 font-bold" for="flexCheckChecked">
        Package 3
        <div className='text-black'>300 taka</div>
      </label>
      <input class="form-check-input appearance-none h-4 w-4 ml-10 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1  bg-no-repeat bg-center bg-contain  checked:bg-blue-600 ml-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" checked={isChecked_pack3} onChange={handleOnChange_pack3}/>
      </div>
      </div>
      {/*Check List Ends*/}

      <hr className='mt-20'></hr>
      <div className='flex-row  rounded-lg mt-10 relative right-0'>
      <button className='rounded bg-blue-500 text-white w-[9vw] h-[3vw] mr-5' onClick={handle}>Save</button>
      <button className='rounded border-2 border-blue-500 text-blue-600 w-[9vw] h-[3vw]'>Cancel</button>
      </div>

      </form>
</div>

  </>);
}

export default Sidebar;
