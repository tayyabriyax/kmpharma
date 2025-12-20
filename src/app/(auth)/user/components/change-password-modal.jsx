"use client"

import {
    X
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updatePassword } from "@/lib/slices/userSlice";
import PasswordField from "@/components/password-field";
import SubmitButton from "@/components/submit-button";

export default function ChangePasswordModal({ isOpen, onClose, selectedItem, method }) {

    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(updatePassword({ email: selectedItem.email, password: newPassword }));
        onClose();
        setNewPassword("");
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between border-b py-4 mx-6 border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Update Password
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-2 rounded-full cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <PasswordField
                        label={"New Password"}
                        id={"new_password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                    <SubmitButton
                        label="Save Changes"
                        onClick={handleSubmit}
                    // loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
