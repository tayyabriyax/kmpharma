"use client";
import { useId } from "react";

export default function SelectInput({
    label,
    icon: Icon,
    options = [],
    value,
    onChange,
    name,
    placeholder = "Select an option",
    required = false,
    disabled = false
}) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm md:text-base font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon}

                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    className={`w-full ${Icon ? "pl-10" : "pl-3"
                        } pr-8 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg
                        text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white appearance-none
                        transition-all duration-200`}
                >
                    <option value="">{placeholder}</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown arrow */}
                <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
            </div>
        </div>
    );
}
