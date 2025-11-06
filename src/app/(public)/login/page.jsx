"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import SubmitButton from "@/components/submit-button"
import { useDispatch, useSelector } from "react-redux"
import { loginAsync } from "@/lib/slices/authSlice"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.kmpharma.auth.loading);
    const isLoggedIn = useSelector(state => state.kmpharma.auth.isLoggedIn);

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/dashboard")
        }
    }, [isLoggedIn])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(loginAsync(loginCredentials));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4 text-slate-700">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h1 className="text-2xl font-semibold text-center text-slate-700 mb-6">
                    Pharma Portal Login
                </h1>

                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={loginCredentials.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginCredentials.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
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

                        <div className="text-right mt-1">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-teal-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit */}
                    <SubmitButton label={"Sign In"} onClick={submit} loading={loading} />
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    © {new Date().getFullYear()} PharmaCorp
                </p>
            </div>
        </div>
    )
}
