"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "@/components/submit-button";
import { loginAsync } from "@/lib/slices/authSlice";

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, isLoggedIn } = useSelector(
        (state) => state.kmpharma.auth
    );

    const [showPassword, setShowPassword] = useState(false);
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        dispatch(loginAsync(loginCredentials));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4 text-slate-700">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg md:p-8">
                <h1 className="mb-6 text-center text-2xl font-semibold">
                    Pharma Portal Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={loginCredentials.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2
                                       focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginCredentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10
                                           focus:outline-none focus:ring-2 focus:ring-teal-400"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500
                                           hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>

                    </div>

                    {/* Submit */}
                    <SubmitButton
                        label="Sign In"
                        loading={loading}
                        onClick={handleSubmit}
                    />
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} PharmaCorp
                </p>
            </div>
        </div>
    );
}
