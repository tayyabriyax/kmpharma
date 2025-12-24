"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

const COLORS = ["#42afc0", "#99a1af", "#dc2626", "#7c3aed"];

export default function AdminDashboard({ data = {} }) {
    const users = data.users || {};
    const distributors = data.distributors || {};
    const products = data.products || {};
    const orders = data.orders || {};
    const sales = data.sales || {};
    const monthlySales = data.monthly_sales || {};

    /* ---------- Cards ---------- */
    const stats = [
        {
            title: "Total Users",
            value: users.total_users || 0,
            color: "text-gray-800",
        },
        {
            title: "Distributors",
            value: distributors.total_distributors || 0,
            color: "text-gray-800",
        },
        {
            title: "Products",
            value: products.total_products || 0,
            color: "text-gray-800",
        },
        {
            title: "Total Orders",
            value: orders.total_orders || 0,
            color: "text-gray-800",
        },
    ];

    /* ---------- User Pie ---------- */
    const userPieData = [
        { name: "Admins", value: users.admin_users || 0 },
        { name: "Users", value: users.normal_users || 0 },
    ];

    /* ---------- Orders Pie ---------- */
    const orderPieData = [
        { name: "Paid", value: orders.paid_orders || 0 },
        { name: "Unpaid", value: orders.unpaid_orders || 0 },
    ];

    /* ---------- Monthly Sales ---------- */
    const monthlyData = Object.entries(monthlySales).map(
        ([month, value]) => ({
            month,
            amount: value.paid_amount || 0,
        })
    );

    /* ---------- Last 7 Days ---------- */
    const last7Days =
        sales.last_7_days
            ? Object.entries(sales.last_7_days).map(([day, value]) => ({
                day,
                amount: value.paid_amount || 0,
            }))
            : [];

    return (
        <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item, i) => (
                    <StatCard
                        key={i}
                        title={item.title}
                        value={item.value}
                        color={item.color}
                    />
                ))}
            </div>

            {/* Pie Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard title="Users Distribution">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={userPieData}
                                dataKey="value"
                                outerRadius={90}
                                label
                            >
                                {userPieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Orders Status">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={orderPieData}
                                dataKey="value"
                                outerRadius={90}
                                label
                            >
                                <Cell fill="#42afc0" />
                                <Cell fill="#99a1af" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Sales Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Last 7 Days Sales">
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={last7Days}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#42afc0"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Monthly Sales">
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#42afc0" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Total Sales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Total Paid Amount"
                    value={`Rs ${sales.total?.paid_amount || 0}`}
                    color="text-gray-800"
                />
                <StatCard
                    title="Total Unpaid Amount"
                    value={`Rs ${sales.total?.unpaid_amount || 0}`}
                    color="text-gray-800"
                />
            </div>
        </div>
    );
}

/* ---------- Reusable Components ---------- */

function StatCard({ title, value, color }) {
    return (
        <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className={`text-2xl text-gray-800 font-bold mt-1 ${color}`}>{value}</p>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white border rounded-lg p-4">
            <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
            {children}
        </div>
    );
}
