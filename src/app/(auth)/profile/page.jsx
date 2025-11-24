"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import InputField from "@/components/input-field";
import SubmitButton from "@/components/submit-button";
import { useSelector, useDispatch } from "react-redux";
// import { UPDATE_PROFILE } from "@/lib/slices/authSlice";

export default function EditProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.kmpharma.auth.loggedInUser);

    const [formData, setFormData] = useState({
        fullname: user?.fullname || "",
        username: user?.username || "",
        email: user?.email || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // trigger redux update
        // dispatch(UPDATE_PROFILE(formData));

        setLoading(false);
    };

    return (
        <div className="p-4 md:p-6">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Full Name"
                        id="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="John Doe"
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        required
                    />

                    <InputField
                        label="Username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe"
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        required
                    />

                    <InputField
                        label="Email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        type="email"
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        required
                    />

                    <div className="flex justify-end">
                        <SubmitButton
                            label="Save Changes"
                            loading={loading}
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}
