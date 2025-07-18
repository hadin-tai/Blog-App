import React from 'react'

function Button({
    children,   // OR Text(in simple term)
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor}  ${textColor} ${className}`} type={type} {...props}>
        {children}
    </button>
  )
}

export default Button