"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

export default function UserDashboard({ data = {} }) {
    const orders = data.orders || {};
    const sales = data.sales || {};
    const monthlySales = data.monthly_sales || {};

    /* ---------- Last 7 Days Chart ---------- */
    const last7Days =
        sales.last_7_days
            ? Object.entries(sales.last_7_days).map(([day, value]) => ({
                day,
                amount: value.paid_amount || 0,
            }))
            : [];

    /* ---------- Monthly Sales Chart ---------- */
    const monthlyData = Object.entries(monthlySales).map(
        ([month, value]) => ({
            month,
            amount: value.paid_amount || 0,
        })
    );

    return (
        <div className="space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Total Orders" value={orders.total_orders || 0} />
                <StatCard title="Paid Orders" value={orders.paid_orders || 0} />
                <StatCard title="Unpaid Orders" value={orders.unpaid_orders || 0} />
                <StatCard title="Paid Amount" value={`Rs ${sales.total?.paid_amount || 0}`} />
                <StatCard title="Unpaid Amount" value={`Rs ${sales.total?.unpaid_amount || 0}`} />
                <StatCard
                    title="Total Sales"
                    value={`Rs ${sales.total?.paid_amount || 0}`}
                />
            </div>

            {/* Last 7 Days Sales */}
            <ChartCard title="Last 7 Days Sales">
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={last7Days}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            strokeWidth={2}
                            stroke="#42afc0"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            {/* Monthly Sales */}
            <ChartCard title="Monthly Sales">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#42afc0" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
}

/* ---------- Small Reusable Components ---------- */

function StatCard({ title, value }) {
    return (
        <div className="bg-white rounded-lg border p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white rounded-lg border p-4">
            <h2 className="font-semibold mb-4 text-gray-800">{title}</h2>
            {children}
        </div>
    );
}
