"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";

export default function PasswordField({ label, id, value, onChange }) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border text-gray-700 placeholder:text-gray-400 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-500"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    )
}