import { useCallback } from "react";

interface InputProps{
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    value?: string

}
const Input: React.FC<InputProps> = ({
    type, onChange, disabled, placeholder, value
}) => {

  return (
    <input 
    value={value}
    placeholder={placeholder}
    disabled={disabled}
    type={type}
    onChange={onChange}
    className="
    w-full
    p-3
    border-2
    border-neutral-800
    rounded-lg
    bg-black
    outline-none
    focus:border-blue-500
    focus:border-2
    text-white
    disabled:bg-neutral-900
    disabled:cursor-not-allowed
    disabled:opacity-70
    "
    />
        
    
  )
}

export default Input