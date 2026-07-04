import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { reportStats, employees, attendanceChartData, payrollChartData } from '../../data/sampleData';

const tabs = ['Employee', 'Attendance', 'Leave', 'Payroll'];

const DEPT_COLORS = ['#7c3aed','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#6366f1'];

const deptData = ['Human Resources','Engineering','Marketing','Finance','Sales','Operations','Design'].map((dept, i) => ({
  name: dept.replace(' ','\n'),
  value: [1,3,2,2,2,1,1][i],
}));

const leaveTypeData = [
  { name: 'Annual', value: 7 },
  { name: 'Sick',   value: 4 },
  { name: 'Casual', value: 3 },
  { name: 'Other',  value: 2 },
];

const statusDist = [
  { name: 'Active',   value: 10, fill: '#10b981' },
  { name: 'On Leave', value: 1,  fill: '#f59e0b' },
  { name: 'Inactive', value: 1,  fill: '#ef4444' },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Employee');

  const TabContent = () => {
    if (activeTab === 'Employee') return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Dept Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Employees by Department</h4>
          <p className="text-sm text-gray-400 mb-4">Headcount distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="value" name="Employees" radius={[6, 6, 0, 0]}>
                {deptData.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Employee Status</h4>
          <p className="text-sm text-gray-400 mb-4">Current employment status</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusDist} cx="50%" cy="50%" outerRadius={85} innerRadius={45} dataKey="value" nameKey="name" label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {statusDist.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusDist.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.fill }} />
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        {[
          { label: 'Total Employees', value: reportStats.employee.total,    color: 'text-violet-600' },
          { label: 'Active',          value: reportStats.employee.active,   color: 'text-emerald-600' },
          { label: 'New This Month',  value: reportStats.employee.newThisMonth, color: 'text-blue-600' },
          { label: 'On Leave',        value: reportStats.employee.onLeave,  color: 'text-orange-500' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    );

    if (activeTab === 'Attendance') return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm xl:col-span-2">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Weekly Attendance Trend</h4>
          <p className="text-sm text-gray-400 mb-4">Present, Absent, Late counts per day</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
              <Legend />
              <Bar dataKey="present" name="Present" fill="#7c3aed" radius={[4,4,0,0]} />
              <Bar dataKey="absent"  name="Absent"  fill="#f87171" radius={[4,4,0,0]} />
              <Bar dataKey="late"    name="Late"    fill="#facc15" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {[
          { label: 'Avg Present %', value: `${reportStats.attendance.avgPresent}%`, color: 'text-violet-600' },
          { label: 'Avg Absent %',  value: `${reportStats.attendance.avgAbsent}%`,  color: 'text-red-500' },
          { label: 'Avg Late %',    value: `${reportStats.attendance.avgLate}%`,    color: 'text-yellow-500' },
          { label: 'Avg Leave %',   value: `${reportStats.attendance.avgLeave}%`,   color: 'text-blue-500' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    );

    if (activeTab === 'Leave') return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Leave Type Distribution</h4>
          <p className="text-sm text-gray-400 mb-4">Days taken by leave type</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={leaveTypeData} cx="50%" cy="50%" outerRadius={85} innerRadius={45} dataKey="value" nameKey="name" label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`}>
                {leaveTypeData.map((_, i) => <Cell key={i} fill={DEPT_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 content-start">
          {[
            { label: 'Pending',       value: reportStats.leave.pending,       color: 'text-orange-500' },
            { label: 'Approved',      value: reportStats.leave.approved,      color: 'text-emerald-600' },
            { label: 'Rejected',      value: reportStats.leave.rejected,      color: 'text-red-500' },
            { label: 'Days Taken',    value: reportStats.leave.totalDaysTaken,color: 'text-violet-600' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    );

    if (activeTab === 'Payroll') return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm xl:col-span-2">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Monthly Payroll Disbursement</h4>
          <p className="text-sm text-gray-400 mb-4">Total payroll amount per month (₹)</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={payrollChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Payroll']} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#7c3aed', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {[
          { label: 'Total Paid (Jun)',    value: `₹${(reportStats.payroll.totalPaid/1000).toFixed(0)}K`,    color: 'text-emerald-600' },
          { label: 'Total Pending',       value: `₹${(reportStats.payroll.pending/1000).toFixed(0)}K`,       color: 'text-orange-500' },
          { label: 'Employees on Payroll',value: reportStats.payroll.totalEmployees, color: 'text-violet-600' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    );

    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive HR insights and statistics</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white dark:bg-gray-900 rounded-2xl p-1.5 border border-gray-200 dark:border-gray-700 shadow-sm gap-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === t ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t} Report
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <TabContent />
      </motion.div>
    </div>
  );
}
