import { FormData } from "@/app/lib/form-schema";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProp extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FormData>;
  error?: string;
  required?: boolean;
}

export const Input = ({
  id,
  label,
  type = "text",
  register,
  error,
  required,
  ...rest
}: InputFieldProp) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {required && <span className="text-red-500 mr-[2px]">*</span>}
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...register(id as keyof FormData)}
        {...rest}
        className={`mt-1 px-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-neutral-300"
        }`}
      />
    </div>
  );
};
