import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Clock, CalendarDays, DollarSign, BarChart3,
  ShieldCheck, ArrowRight, UserPlus, CheckCircle, XCircle,
} from 'lucide-react';
import { employees, leaveRequests, attendanceData } from '../../data/sampleData';

const cards = [
  { title: 'Manage Employees',   desc: 'Add, edit, and manage all employee records',       icon: Users,       to: '/employees',  color: 'from-violet-500 to-purple-600' },
  { title: 'Manage Attendance',  desc: 'View and update attendance records',                icon: Clock,       to: '/attendance', color: 'from-blue-500 to-cyan-600'    },
  { title: 'Leave Requests',     desc: 'Approve or reject employee leave applications',    icon: CalendarDays, to: '/leave',     color: 'from-orange-500 to-red-500'    },
  { title: 'Payroll Management', desc: 'Process salaries and download payslips',           icon: DollarSign,  to: '/payroll',   color: 'from-emerald-500 to-teal-600'  },
  { title: 'Reports & Analytics',desc: 'Generate and view comprehensive HR reports',      icon: BarChart3,   to: '/reports',   color: 'from-pink-500 to-rose-600'     },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const pending = leaveRequests.filter(l => l.status === 'Pending').length;
  const active  = employees.filter(e => e.status === 'Active').length;
  const presentToday = attendanceData.filter(a => a.date === '2026-06-30' && a.status === 'Present').length;

  const quickStats = [
    { label: 'Active Employees', value: active,       icon: Users,       color: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20' },
    { label: 'Present Today',    value: presentToday, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Pending Leaves',   value: pending,      icon: XCircle,     color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-700 to-indigo-700 rounded-2xl p-6 text-white flex items-center gap-4"
      >
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
          <ShieldCheck className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-violet-200 text-sm mt-0.5">Manage all HR functions from one place</p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {quickStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3"
          >
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ title, desc, icon: Icon, to, color }, i) => (
          <motion.button
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(to)}
            className="text-left bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{desc}</p>
            <div className="flex items-center gap-1 mt-4 text-sm text-violet-600 dark:text-violet-400 font-medium">
              Manage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Recent Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Add Employee</h3>
        <button
          onClick={() => navigate('/employees')}
          className="flex items-center gap-3 w-full p-4 border-2 border-dashed border-violet-200 dark:border-violet-800 rounded-xl text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors group"
        >
          <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="font-medium">Add New Employee</p>
            <p className="text-xs text-violet-400 mt-0.5">Navigate to employee management</p>
          </div>
          <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
