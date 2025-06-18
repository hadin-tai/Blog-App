import React, { useId } from 'react'


const Input = React.forwardRef(function Input(
  {
    label,
    type = 'text',
    className = 'bg-gray-300',
    ...props
  },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block text-black/60 mb-1 pl-1 font-medium text-sm">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className={`${className} bg-gray-300 w-full px-3  py-2 border text-black/60 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        {...props}
      />
    </div>
  )
})

export default Input
