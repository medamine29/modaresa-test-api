import React from "react";
import { useState, useEffect, useRef } from "react"
import { GoChevronDown } from "react-icons/go"
import { Option } from "../interfaces";
import classNames from "classnames";

interface DropdownProps {
  placeholder?: string;
  options: Option[];
  value?: Option;
  onChange: (selectedOptionValue: Option) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, value, onChange, className }) => {

  const [isOpen, setIsOpen] = useState(false)
  const divEl = useRef<HTMLDivElement>(null)

  const dropdownClasses = classNames(className, 'relative cursor-pointer')

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) return
      if (!divEl.current.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('click', handler, false)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen)
  }

  const handleOptionClick = (selectedOption: Option) => {
    // close dropdown
    setIsOpen(false)
    // // select option
    onChange(selectedOption)
  }

  const renderedOptions = options.map((optionElem) => {
    return (
      <div
        key={optionElem.key}
        className="hover:bg-gray-200 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(optionElem)}
      >
        {optionElem.label}
      </div>
    )
  })

  return (
    <div 
      ref={divEl}
      className={dropdownClasses}
    >
      <div 
        className="flex justify-between items-center gap-2 m-2"
        onClick={handleClick}
      >
        { value?.label || placeholder || 'Select...' }
        <GoChevronDown className="text-lg"/>
      </div>
      {isOpen && <div className="absolute top-full w-full border bg-white z-30 p-1 my-1"> { renderedOptions } </div>}
    </div>
  )
}

export default Dropdown