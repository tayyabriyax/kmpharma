"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AutoSuggestSelect({
    label,
    name,
    id,
    options = [],
    value,
    onChange,
    placeholder = "Select",
    icon,
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const containerRef = useRef(null);

    const selectedOption = options.find((o) => o.value === value);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
    );

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange({
            target: {
                name,
                value: option.value,
            },
        });
        setQuery("");
        setOpen(false);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            onPointerDown={(e) => e.stopPropagation()}
        >
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label}
                </label>
            )}

            <div
                className="relative bg-white border border-gray-300 rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-teal-500"
                onClick={() => setOpen(true)}
            >
                {icon}

                <input
                    id={id}
                    name={name}
                    type="text"
                    value={
                        open
                            ? query
                            : selectedOption?.label || ""
                    }
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg outline-none text-sm placeholder:text-gray-500 text-gray-700"
                    readOnly={!open}
                />

                <ChevronDown
                    size={18}
                    className="absolute right-3 top-3 text-gray-400"
                />
            </div>

            {open && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="px-3 py-2 text-sm text-gray-500 cursor-pointer hover:bg-teal-50"
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
