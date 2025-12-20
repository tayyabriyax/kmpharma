"use client"

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, KeyRound, Trash, UserCheck } from "lucide-react";
import DeleteModal from "@/components/delete-modal";
import { activateUser, deleteUserById } from "@/lib/slices/userSlice";
import { useDispatch } from "react-redux";
import ChangePasswordModal from "./change-password-modal";

export default function ResponsiveTable({ data = [] }) {
    const [openRow, setOpenRow] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const [selectedItem, setSelectedItem] = useState(0);
    const [selectedUser, setSelectedUser] = useState({});

    const dispatch = useDispatch();

    const toggleRow = (index) => {
        setOpenRow(openRow === index ? null : index);
    };

    const handleClickOnTrash = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    }

    const handleClickOnActiveUser = (id) => {
        dispatch(activateUser(id));
    }

    const handleClickOnPassword = (user) => {
        setShowChangePasswordModal(true);
        setSelectedUser(user);
    }

    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-200 text-gray-800 uppercase font-bold">
                        <tr>
                            <th className="px-4 py-3">Full Name</th>
                            <th className="px-4 py-3">Userame</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, i) => (
                            <tr
                                key={i}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3">{item.fullname}</td>
                                <td className="px-4 py-3">{item.username}</td>
                                <td className="px-4 py-3">{item.email}</td>
                                <td className="px-4 py-3">{item.role}</td>
                                <td className="px-2 py-1 space-x-4">
                                    {
                                        item?.role === "User" && (
                                            item?.is_active === true ?
                                                <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                                    <Trash size={18} />
                                                </button>
                                                :
                                                <button onClick={() => handleClickOnActiveUser(item.id)} className="text-gray-500 cursor-pointer p-2 rounded-full hover:bg-gray-200">
                                                    <UserCheck size={18} />
                                                </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Table */}
            <div className="md:hidden divide-y divide-gray-200">
                {data.map((item, i) => {
                    const isOpen = openRow === i;
                    return (
                        <div
                            key={i}
                            className="px-4 py-3 hover:bg-gray-50 transition"
                            onClick={() => toggleRow(i)}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-gray-800">{item.fullname}</p>
                                    <p className="text-sm text-gray-500">{item.email}</p>
                                </div>
                                <div className="space-x-4">
                                    {
                                        item?.role === "User" && (
                                            item?.is_active === true ?
                                                <button onClick={() => handleClickOnTrash(item.id)} className="text-gray-500">
                                                    <Trash size={18} />
                                                </button>
                                                :
                                                <button onClick={() => handleClickOnActiveUser(item.id)} className="text-gray-500">
                                                    <UserCheck size={18} />
                                                </button>
                                        )
                                    }
                                    <button onClick={() => handleClickOnPassword(item)} className="text-gray-500">
                                        <KeyRound size={18} />
                                    </button>
                                    <button className="text-gray-500">
                                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`transition-all overflow-hidden ${isOpen ? "max-h-40 mt-3" : "max-h-0"
                                    }`}
                            >
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>
                                        <span className="font-semibold">Username : </span>{item.username}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Role : </span>{item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                selectedItem={selectedItem}
                method={deleteUserById}
                onClose={() => setShowDeleteModal(false)}
            />
            <ChangePasswordModal
                isOpen={showChangePasswordModal}
                selectedItem={selectedUser}
                onClose={() => setShowChangePasswordModal(false)} />
        </div>
    );
}
