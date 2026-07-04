import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Clock, UserX, CalendarDays, ArrowRight,
  UserPlus, FileText, DollarSign, BarChart3,
  CheckCircle, XCircle, TrendingUp, Activity,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Badge, { statusColor } from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import { useAuth } from '../context/AuthContext';
import {
  employees, attendanceChartData, recentActivities, leaveRequests,
} from '../data/sampleData';

const activityTypeStyle = {
  leave:      'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
  attendance: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',
  employee:   'bg-violet-100 dark:bg-violet-900/30 text-violet-600',
  payroll:    'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600',
};

const quickActions = [
  { label: 'Add Employee',    icon: UserPlus,     to: '/employees',  bg: 'bg-indigo-600 hover:bg-indigo-700'   },
  { label: 'Attendance',      icon: CheckCircle,  to: '/attendance', bg: 'bg-violet-600 hover:bg-violet-700'   },
  { label: 'Apply Leave',     icon: CalendarDays, to: '/leave',      bg: 'bg-blue-600 hover:bg-blue-700'       },
  { label: 'Payroll',         icon: DollarSign,   to: '/payroll',    bg: 'bg-emerald-600 hover:bg-emerald-700' },
  { label: 'Reports',         icon: BarChart3,    to: '/reports',    bg: 'bg-pink-600 hover:bg-pink-700'       },
  { label: 'Admin',           icon: FileText,     to: '/admin',      bg: 'bg-orange-500 hover:bg-orange-600'   },
];

function StatCard({ title, value, subtitle, icon: Icon, color, trend, index }) {
  const colors = {
    indigo:  { icon: 'text-indigo-600 dark:text-indigo-400',  bg: 'bg-indigo-50 dark:bg-indigo-900/20',  ring: 'ring-indigo-100 dark:ring-indigo-800'  },
    emerald: { icon: 'text-emerald-600 dark:text-emerald-400',bg: 'bg-emerald-50 dark:bg-emerald-900/20',ring: 'ring-emerald-100 dark:ring-emerald-800' },
    red:     { icon: 'text-red-500 dark:text-red-400',        bg: 'bg-red-50 dark:bg-red-900/20',        ring: 'ring-red-100 dark:ring-red-800'         },
    orange:  { icon: 'text-orange-500 dark:text-orange-400',  bg: 'bg-orange-50 dark:bg-orange-900/20',  ring: 'ring-orange-100 dark:ring-orange-800'   },
  };
  const c = colors[color] || colors.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center ring-1 ${c.ring}`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
            <TrendingUp className="w-3 h-3" />
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 px-3 py-2.5 text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.stroke }} />
          <span className="text-gray-500 dark:text-gray-400">{p.name}:</span>
          <span className="font-semibold text-gray-700 dark:text-gray-200">{p.value}</span>
        </div>
      ))}
    </div>
  );
  return null;
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const active  = employees.filter(e => e.status === 'Active').length;
  const pending = leaveRequests.filter(l => l.status === 'Pending').length;
  const now     = new Date();
  const hour    = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const stats = [
    { title: 'Total Employees',      value: employees.length, subtitle: `${active} currently active`,  icon: Users,       color: 'indigo',  trend: 8,  index: 0 },
    { title: 'Present Today',        value: 9,                subtitle: `of ${employees.length} total`,icon: CheckCircle, color: 'emerald', trend: 5,  index: 1 },
    { title: 'Absent Today',         value: 3,                subtitle: 'Need follow-up',              icon: UserX,       color: 'red',     trend: -2, index: 2 },
    { title: 'Pending Leaves',       value: pending,          subtitle: 'Awaiting approval',           icon: CalendarDays,color: 'orange',  trend: 0,  index: 3 },
  ];

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-6 overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute right-16 -bottom-10 w-36 h-36 bg-white/5 rounded-full" />
        <div className="absolute right-0 top-0 w-24 h-24 bg-violet-500/30 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-indigo-200 text-sm font-medium flex items-center gap-2">
              👋 {greeting}
            </p>
            <h2 className="text-white text-xl font-bold mt-0.5">{user?.name || 'Admin'}</h2>
            <p className="text-indigo-200 text-sm mt-1">Here's your HR overview for today</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {[
              { label: now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }), sub: 'Today' },
              { label: user?.department || 'HR Dept', sub: 'Department' },
            ].map(({ label, sub }) => (
              <div key={sub} className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
                <p className="text-[10px] text-indigo-200 font-medium">{sub}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => <StatCard key={s.title} {...s} />)}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Attendance Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Weekly attendance trend</p>
            </div>
            <div className="flex gap-3">
              {[['#6366f1','Present'],['#f87171','Absent'],['#fbbf24','Late']].map(([c,l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span className="text-xs text-gray-400">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={attendanceChartData} margin={{ top: 4, right: 8, left: -22, bottom: 0 }}>
              <defs>
                <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gAbsent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="present" name="Present" stroke="#6366f1" strokeWidth={2.5} fill="url(#gPresent)" dot={false} />
              <Area type="monotone" dataKey="absent"  name="Absent"  stroke="#f87171" strokeWidth={2} fill="url(#gAbsent)" dot={false} />
              <Area type="monotone" dataKey="late"    name="Late"    stroke="#fbbf24" strokeWidth={2} fill="none" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Recent Activity</h3>
            <Activity className="w-4 h-4 text-gray-300 dark:text-gray-600" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex gap-3 items-start"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${activityTypeStyle[a.type] || 'bg-gray-100 text-gray-500'}`}>
                  {a.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{a.user}</span>{' '}{a.action}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm"
      >
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {quickActions.map(({ label, icon: Icon, to, bg }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.48 + i * 0.04 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(to)}
              className={`${bg} text-white rounded-xl p-3.5 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium leading-tight text-center">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Pending Leaves Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 dark:border-gray-800">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Pending Leave Requests</h3>
            <p className="text-xs text-gray-400 mt-0.5">{pending} requests awaiting approval</p>
          </div>
          <button
            onClick={() => navigate('/leave')}
            className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium transition-colors"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                {['Employee','Type','Duration','Days','Status'].map(h => (
                  <th key={h} className="text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {leaveRequests.filter(l => l.status === 'Pending').map((l, i) => (
                <motion.tr
                  key={l.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.04 }}
                  className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={l.employee} size="sm" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{l.employee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">{l.type}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-gray-400">{l.from} → {l.to}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300">{l.days}d</td>
                  <td className="px-5 py-3.5"><Badge label={l.status} color={statusColor(l.status)} dot /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
