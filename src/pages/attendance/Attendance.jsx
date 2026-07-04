import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Calendar, Filter } from 'lucide-react';
import Badge, { statusColor } from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import StatCard from '../../components/common/StatCard';
import { attendanceData } from '../../data/sampleData';

const tabs = ['Daily', 'Weekly', 'Monthly'];

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('Daily');
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [records, setRecords] = useState(attendanceData);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckedIn(true);
    setCheckInTime(now);
    setCheckOutTime(null);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckedIn(false);
    setCheckOutTime(now);
  };

  const fmt = (d) => d ? d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '--';
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount  = records.filter(r => r.status === 'Absent').length;
  const lateCount    = records.filter(r => r.status === 'Late').length;
  const leaveCount   = records.filter(r => r.status === 'Leave').length;

  const filtered = activeTab === 'Daily'
    ? records.filter(r => r.date === '2026-06-30')
    : activeTab === 'Weekly'
    ? records.filter(r => r.date >= '2026-06-28')
    : records;

  return (
    <div className="space-y-6">
      {/* Check In/Out Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-6 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-violet-200 text-sm">{today}</p>
            <p className="text-4xl font-bold font-mono mt-1 tracking-wide">
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <div className="flex gap-4 mt-3 text-sm">
              <span className="text-violet-200">Check In: <span className="text-white font-semibold">{fmt(checkInTime)}</span></span>
              <span className="text-violet-200">Check Out: <span className="text-white font-semibold">{fmt(checkOutTime)}</span></span>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleCheckIn}
              disabled={checkedIn}
              className="flex items-center gap-2 px-6 py-3 bg-white text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Check In
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleCheckOut}
              disabled={!checkedIn}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="w-5 h-5" />
              Check Out
            </motion.button>
          </div>
        </div>
        {checkedIn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-white/15 rounded-xl px-4 py-2.5 flex items-center gap-2 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">You are checked in · Working hours running...</span>
          </motion.div>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Present" value={presentCount} icon={CheckCircle} color="green" index={0} />
        <StatCard title="Absent"  value={absentCount}  icon={XCircle}     color="red"   index={1} />
        <StatCard title="Late"    value={lateCount}     icon={Clock}       color="yellow" index={2} />
        <StatCard title="On Leave" value={leaveCount}   icon={Calendar}    color="blue"  index={3} />
      </div>

      {/* Attendance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 gap-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Attendance Records</h3>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === t ? 'bg-white dark:bg-gray-700 text-violet-700 dark:text-violet-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Employee', 'Date', 'Check In', 'Check Out', 'Hours', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 text-sm">No records found</td>
                </tr>
              ) : filtered.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={row.employee} size="sm" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{row.employee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{row.date}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{row.checkIn}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">{row.checkOut}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{row.hours}</td>
                  <td className="px-5 py-3"><Badge label={row.status} color={statusColor(row.status)} dot /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
