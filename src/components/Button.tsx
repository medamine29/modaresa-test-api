import React from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  outline?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  className?: string;
  [x:string]: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  outline,
  rounded,
  disabled,
  className,
  ...rest
}) => {
  const classes = twMerge(
    classNames(className, 'px-3 py-1.5 border flex items-center border-black bg-black text-white', {
      'rounded': rounded,
      'bg-white text-black': outline,
      'opacity-50 cursor-not-allowed': disabled
    })
  );

  return (
    <button 
      {...rest} 
      disabled={disabled} 
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
