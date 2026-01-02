"use client";

import { useId } from "react";

export default function TextAreaField({
    label,
    icon: Icon,
    value,
    onChange,
    name,
    id,
    placeholder = "Enter remarks...",
    required = false,
    disabled = false,
    rows = 4,
}) {
    const uid = useId();
    const inputId = id || uid;

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block mb-1 text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <div className="relative">
                <textarea
                    id={inputId}
                    name={name || inputId}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    rows={rows}
                    className={`
            w-full 
            border border-gray-300 bg-white
            rounded-xl 
            focus:outline-none 
            focus:ring-teal-500 
            transition-all 
            text-gray-700
            px-3 py-3 
            resize-y
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
          `}
                />
            </div>
        </div>
    );
}
