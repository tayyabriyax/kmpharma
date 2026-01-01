"use client";

import { useEffect, useState } from "react";
import { User, Mail, Lock, Phone, ArrowLeft } from "lucide-react";
import InputField from "@/components/input-field";
import SubmitButton from "@/components/submit-button";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "@/lib/slices/userSlice";
import { useRouter } from "next/navigation";
import BackButton from "@/components/back-button";

export default function EditProfilePage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state) => state.kmpharma.user.userDetails);
    const loading = useSelector((state) => state.kmpharma.user.loading);

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
    });

    useEffect(() => {
        setFormData({
            fullname: user?.fullname,
            username: user?.username
        })
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(editUser(formData));
    };

    return (
        <div className="md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <BackButton />
            </div>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Edit Profile
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField
                        label="Full Name"
                        id="fullname"
                        value={formData.fullname ?? ""}
                        onChange={handleChange}
                        placeholder="John Doe"
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        required
                    />

                    <InputField
                        label="Username"
                        id="username"
                        value={formData.username ?? ""}
                        onChange={handleChange}
                        placeholder="johndoe"
                        icon={<User className="absolute left-3 top-3 text-gray-400" size={18} />}
                        required
                    />

                    <InputField
                        label="Email"
                        id="email"
                        value={user?.email ?? ""}
                        placeholder="Enter your email"
                        type="email"
                        icon={<Mail className="absolute left-3 top-3 text-gray-400" size={18} />}
                        readOnly={true}
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
