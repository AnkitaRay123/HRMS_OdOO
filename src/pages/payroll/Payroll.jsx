import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, DollarSign, TrendingUp, Users, Clock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Badge, { statusColor } from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import StatCard from '../../components/common/StatCard';
import { payrollData, payrollChartData } from '../../data/sampleData';

export default function Payroll() {
  const [activeMonth, setActiveMonth] = useState('June 2026');
  const months = [...new Set(payrollData.map(p => p.month))];
  const filtered = payrollData.filter(p => p.month === activeMonth);
  const totalPaid = filtered.filter(p => p.status === 'Paid').reduce((s, p) => s + p.net, 0);
  const totalPending = filtered.filter(p => p.status === 'Pending').reduce((s, p) => s + p.net, 0);

  const handleDownload = (p) => {
    const content = `PAYSLIP - ${p.month}\n\nEmployee: ${p.employee}\nBasic: ₹${p.basic.toLocaleString()}\nHRA: ₹${p.hra.toLocaleString()}\nAllowances: ₹${p.allowances.toLocaleString()}\nDeductions: -₹${p.deductions.toLocaleString()}\n\nNet Pay: ₹${p.net.toLocaleString()}\nStatus: ${p.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `Payslip_${p.employee.replace(' ','_')}_${p.month.replace(' ','_')}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payroll Management</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage salaries, payslips and payroll history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Paid"    value={`₹${(totalPaid/1000).toFixed(0)}K`}    icon={DollarSign}  color="green"  index={0} />
        <StatCard title="Pending"       value={`₹${(totalPending/1000).toFixed(0)}K`} icon={Clock}       color="orange" index={1} />
        <StatCard title="Employees"     value={filtered.length}                         icon={Users}       color="violet" index={2} />
        <StatCard title="Avg. Salary"   value={`₹${filtered.length ? Math.round(filtered.reduce((s,p)=>s+p.net,0)/filtered.length/1000) : 0}K`} icon={TrendingUp} color="blue" index={3} />
      </div>

      {/* Chart + Month Selector */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Payroll Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Monthly payroll disbursement (₹)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={payrollChartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Payroll']} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="amount" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Select Month</h3>
          <div className="space-y-2">
            {months.map(m => (
              <button key={m} onClick={() => setActiveMonth(m)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeMonth === m ? 'bg-violet-600 text-white shadow-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                {m}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Selected Month</p>
            <p className="text-lg font-bold text-violet-700 dark:text-violet-300 mt-1">{activeMonth}</p>
            <p className="text-sm text-violet-500 dark:text-violet-400 mt-1">₹{totalPaid.toLocaleString()} disbursed</p>
          </div>
        </motion.div>
      </div>

      {/* Payslip Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">Payslips — {activeMonth}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Employee', 'Basic', 'HRA', 'Allowances', 'Deductions', 'Net Pay', 'Status', 'Payslip'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={p.employee} size="sm" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{p.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">₹{p.basic.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">₹{p.hra.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">₹{p.allowances.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-red-500">-₹{p.deductions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-bold text-emerald-600">₹{p.net.toLocaleString()}</td>
                  <td className="px-4 py-3"><Badge label={p.status} color={statusColor(p.status)} dot /></td>
                  <td className="px-4 py-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-lg text-xs font-medium hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
