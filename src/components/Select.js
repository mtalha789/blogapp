import React,{forwardRef,useId} from 'react'

function Select({
    options,
    className,
    ...props
},ref) {
    const id= useId()

  return (
    <select 
    id={id}
    ref={ref}
    className={`px-3 py-2 bg-white text-black border-gray-200
    rounded-lg w-full focus:bg-gray-500 duration-200 ${className}
    `}>
        {options.map((option)=>(
            <option value={option}
            key={option}
            >
                {option}
            </option>
        ))}
    </select>
  )
}

export default forwardRef(Select);
