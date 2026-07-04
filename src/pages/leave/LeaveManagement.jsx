import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Plus, CheckCircle } from 'lucide-react';
import Badge, { statusColor } from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Modal from '../../components/common/Modal';
import { leaveRequests as initial, leaveBalance } from '../../data/sampleData';

const leaveTypes = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity', 'Paternity', 'Unpaid Leave'];

const balanceColors = ['violet', 'blue', 'green', 'pink', 'orange', 'red'];
const bgMap = {
  violet: 'from-violet-500 to-purple-600',
  blue:   'from-blue-500 to-cyan-600',
  green:  'from-emerald-500 to-teal-600',
  pink:   'from-pink-500 to-rose-600',
  orange: 'from-orange-500 to-red-500',
  red:    'from-red-500 to-rose-700',
};

export default function LeaveManagement() {
  const [requests, setRequests] = useState(initial);
  const [showApply, setShowApply] = useState(false);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ type: 'Annual Leave', from: '', to: '', reason: '' });

  const myRequests = requests.filter(r => r.employee === 'Ankita Sharma');
  const pending = requests.filter(r => r.status === 'Pending').length;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleApply = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason) return;
    const from = new Date(form.from);
    const to   = new Date(form.to);
    const days = Math.max(1, Math.round((to - from) / 86400000) + 1);
    const newReq = {
      id: Date.now(), employee: 'Ankita Sharma',
      type: form.type, from: form.from, to: form.to, days,
      reason: form.reason, status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };
    setRequests(r => [newReq, ...r]);
    setApplied(true);
    setTimeout(() => { setApplied(false); setShowApply(false); setForm({ type: 'Annual Leave', from: '', to: '', reason: '' }); }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Leave Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{pending} pending requests</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowApply(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Apply Leave
        </motion.button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {leaveBalance.map((lb, i) => (
          <motion.div
            key={lb.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${bgMap[balanceColors[i] || 'violet']} rounded-2xl p-4 text-white`}
          >
            <p className="text-xs font-medium text-white/80">{lb.type}</p>
            <div className="flex items-end justify-between mt-2">
              <div>
                <p className="text-2xl font-bold">{lb.remaining}</p>
                <p className="text-xs text-white/70 mt-0.5">remaining</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{lb.used}/{lb.total}</p>
                <p className="text-xs text-white/70">used</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 bg-white/20 rounded-full h-1.5">
              <div className="bg-white rounded-full h-1.5" style={{ width: `${(lb.used / lb.total) * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leave History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">All Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Employee', 'Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {requests.map((req, i) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={req.employee} size="sm" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{req.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{req.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{req.from}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{req.to}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{req.days}d</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-[160px] truncate">{req.reason}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{req.appliedOn}</td>
                  <td className="px-4 py-3"><Badge label={req.status} color={statusColor(req.status)} dot /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Apply Modal */}
      <Modal isOpen={showApply} onClose={() => setShowApply(false)} title="Apply for Leave" size="md">
        <AnimatePresence>
          {applied ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">Leave Applied!</p>
              <p className="text-sm text-gray-400">Your leave request has been submitted.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleApply} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Leave Type</label>
                <select value={form.type} onChange={e => set('type', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700">
                  {leaveTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">From Date</label>
                  <input type="date" required value={form.from} onChange={e => set('from', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">To Date</label>
                  <input type="date" required value={form.to} onChange={e => set('to', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reason</label>
                <textarea required rows={3} value={form.reason} onChange={e => set('reason', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 resize-none"
                  placeholder="Briefly describe the reason..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowApply(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors">Submit Request</button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
}
