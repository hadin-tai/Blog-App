import React, { useId } from 'react'

function Select({
    options, 
    label,
    className="py-2 bg-gray-300",
    ...props 
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select 
        name="" 
        id={id}
        ref={ref}
        className={`px-3 py-2 bg-gray-300 rounded-lg text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option)=>(
                <option key = {option} value={option} className='bg-gray-300'>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select) 