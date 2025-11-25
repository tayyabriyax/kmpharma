"use client";

import { useState } from "react";
import SubmitButton from "@/components/submit-button";
import { useDispatch } from "react-redux";
import PasswordField from "@/components/password-field";

export default function ChangePassword() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
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
        <div className="p-4 md:p-10">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">

                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <PasswordField
                        label={"Old Password"}
                        id={"old_password"}
                        value={formData.old_password}
                        onChange={handleChange} />

                    <PasswordField
                        label={"New Password"}
                        id={"new_password"}
                        value={formData.new_password}
                        onChange={handleChange} />

                    {/* <PasswordField
                        label={"Reenter Password"}
                        id={"old_password"}
                        value={formData.old_password}
                        onChange={handleChange} /> */}

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
