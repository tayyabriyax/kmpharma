"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "@/lib/slices/dashboardSlice";
import AdminDashboard from "./components/admin-dashboard";
import UserDashboard from "./components/user-dashboard";

export default function DashboardPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDashboardData());
    }, [dispatch]);

    const data = useSelector(
        state => state.kmpharma.dashboard?.data
    ) || {};

    const role = useSelector(
        state => state.kmpharma.auth?.loggedInUser?.role
    );

    if (!role) {
        return (
            <div className="p-6 text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    return role === "Admin" ? (
        <AdminDashboard data={data} />
    ) : (
        <UserDashboard data={data} />
    );
}
