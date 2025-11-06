"use client"

import { useState } from "react";
import { Mail } from "lucide-react";
import SubmitButton from "@/components/submit-button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle API call to send reset link
        console.log("Reset link sent to:", email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 md:p-8">
                <h1 className="text-2xl font-semibold text-center mb-2">
                    Forgot Password
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Enter your registered email to receive a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <SubmitButton label={"Send Reset Link"} />
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Remember your password?{" "}
                    <a href="/login" className="text-teal-600 hover:underline">
                        Go back to Login
                    </a>
                </p>
            </div>
        </div>
    );
}
