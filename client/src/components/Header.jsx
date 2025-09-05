import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput , input} = useAppContext();
   const inputRef = useRef();

   const onSubmitHandler = async (e)=>{
     e.preventDefault();
     setInput(inputRef.current.value)
   } 

   const onClear = ()=> {
    setInput('')
    inputRef.current.value = ''
   }
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-10 mb-6'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40
            bg-primary/10 rounded-full text-sm text-primary'>
                <p>Enhanced with AI: Check out what's new!</p>
                <img src ={assets.star_icon} className='w-2.5' alt=""/>
            </div>

            <h1 className='text-2xl sm:text-4xl font-semibold sm:leading-snug text-gray-700'>IITG Junta’s unofficial 
              <span className='text-primary'> blogging</span> <br/>platform.</h1>

              <p className = 'my-4 sm:my-6 max-w-2xl m-auto max-sm:text-xs text-shadow-gray-800'> This is your space to think out loud, express freely, and write without filters.
          Whether it's one word or a thousand — your story begins here.
              </p>
              <form onSubmit={onSubmitHandler} className='flex justify-between max-w-md mx-auto border border-gray-300 bg-white 
              rounded overflow-hidden text-sm'>
                <input ref = {inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-3 py-1.5 outline-none'/>
                <button type="submit" className='bg-primary text-white px-4 py-1.5 m-1
                rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
              </form>
          </div>

          <div className='text-center'>
           {
           input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>
           }
          </div>
        <img src={assets.gradientBackground} alt=""  className='absolute -top-40 -z-10 opacity-50'/>
    </div>
  )
}

export default Header