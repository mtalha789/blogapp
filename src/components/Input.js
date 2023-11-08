import React,{useId} from 'react'


const Input = React.forwardRef(function Input({
    type='text',
    label,
    placeholder,
    className = '',
    ...props
},ref){
    const id= useId()
    return (
        <div className="w-full">
            {label && <label 
            className='mb-1 pl-1 inline-block'
            htmlFor={id}
            >
                {label}
            </label>}
            <input 
            type={type}  
            ref={ref}
            id={id}
            placeholder={placeholder || ''}
            className={`w-full px-3 py-2 outline-none focus:bg-gray-200
            border-gray-200 ${className}`}
            {...props}
            />

        </div>
    )
})

export default Input
