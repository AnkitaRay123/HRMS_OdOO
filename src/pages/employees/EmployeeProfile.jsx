import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase,
  DollarSign, Edit2, Building2, User,
} from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import Badge, { statusColor } from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import EmployeeForm from './EmployeeForm';
import { employees as initialEmployees, attendanceData, leaveRequests, payrollData } from '../../data/sampleData';

const tabs = ['Personal', 'Job Details', 'Attendance', 'Leave', 'Payroll'];

export default function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeTab, setActiveTab] = useState('Personal');
  const [editOpen, setEditOpen] = useState(false);

  const emp = employees.find(e => e.id === Number(id));
  if (!emp) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <User className="w-16 h-16 text-gray-300" />
      <p className="text-gray-500 dark:text-gray-400">Employee not found</p>
      <button onClick={() => navigate('/employees')} className="text-violet-600 hover:text-violet-700 flex items-center gap-1 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Employees
      </button>
    </div>
  );

  const empAttendance = attendanceData.filter(a => a.employee === emp.name);
  const empLeaves = leaveRequests.filter(l => l.employee === emp.name);
  const empPayroll = payrollData.filter(p => p.employee === emp.name);

  const handleSave = (data) => {
    setEmployees(emps => emps.map(e => e.id === emp.id ? { ...e, ...data } : e));
    setEditOpen(false);
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-sm text-gray-800 dark:text-gray-200 mt-0.5 font-medium">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/employees')} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Employees
      </button>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="h-28 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 relative z-10">
            <div className="ring-4 ring-white dark:ring-gray-900 rounded-2xl shadow-lg">
              <Avatar name={emp.name} size="2xl" className="rounded-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{emp.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{emp.position} · {emp.department}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge label={emp.status} color={statusColor(emp.status)} dot />
                  <button
                    onClick={() => setEditOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Monthly Salary', value: `₹${emp.salary.toLocaleString()}`, color: 'text-violet-600' },
              { label: 'Join Date', value: emp.joinDate, color: 'text-blue-600' },
              { label: 'Attendance (Jun)', value: `${empAttendance.filter(a => a.status === 'Present').length} days`, color: 'text-emerald-600' },
              { label: 'Leave Taken', value: `${empLeaves.filter(l => l.status === 'Approved').reduce((s,l) => s+l.days, 0)} days`, color: 'text-orange-500' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-violet-600 text-violet-600' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'Personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Contact Information</p>
              <InfoRow icon={Mail} label="Email" value={emp.email} />
              <InfoRow icon={Phone} label="Phone" value={emp.phone} />
              <InfoRow icon={MapPin} label="Address" value={emp.address} />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Personal Details</p>
              <InfoRow icon={User} label="Gender" value={emp.gender} />
              <InfoRow icon={Calendar} label="Date of Birth" value={emp.dob} />
              <InfoRow icon={Calendar} label="Join Date" value={emp.joinDate} />
            </div>
          </div>
        )}

        {activeTab === 'Job Details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Job Information</p>
              <InfoRow icon={Briefcase} label="Position" value={emp.position} />
              <InfoRow icon={Building2} label="Department" value={emp.department} />
              <InfoRow icon={Calendar} label="Join Date" value={emp.joinDate} />
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Salary Information</p>
              <InfoRow icon={DollarSign} label="Monthly Basic" value={`₹${emp.salary.toLocaleString()}`} />
              <InfoRow icon={DollarSign} label="HRA (30%)" value={`₹${(emp.salary * 0.3).toLocaleString()}`} />
              <InfoRow icon={DollarSign} label="Gross Salary" value={`₹${(emp.salary * 1.4).toLocaleString()}`} />
            </div>
          </div>
        )}

        {activeTab === 'Attendance' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">Attendance History</h3>
            </div>
            {empAttendance.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No attendance records found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>{['Date','Check In','Check Out','Hours','Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {empAttendance.map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-300">{a.date}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{a.checkIn}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{a.checkOut}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{a.hours}</td>
                      <td className="px-5 py-3"><Badge label={a.status} color={statusColor(a.status)} dot /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'Leave' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">Leave History</h3>
            </div>
            {empLeaves.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No leave records found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>{['Type','From','To','Days','Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {empLeaves.map(l => (
                    <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{l.type}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{l.from}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{l.to}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{l.days}d</td>
                      <td className="px-5 py-3"><Badge label={l.status} color={statusColor(l.status)} dot /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'Payroll' && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">Payroll History</h3>
            </div>
            {empPayroll.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">No payroll records found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>{['Month','Basic','HRA','Deductions','Net Pay','Status'].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-5 py-3">{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {empPayroll.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300">{p.month}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">₹{p.basic.toLocaleString()}</td>
                      <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">₹{p.hra.toLocaleString()}</td>
                      <td className="px-5 py-3 text-sm text-red-500">-₹{p.deductions.toLocaleString()}</td>
                      <td className="px-5 py-3 text-sm font-semibold text-emerald-600">₹{p.net.toLocaleString()}</td>
                      <td className="px-5 py-3"><Badge label={p.status} color={statusColor(p.status)} dot /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Employee" size="lg">
        <EmployeeForm initial={emp} onSave={handleSave} onCancel={() => setEditOpen(false)} />
      </Modal>
    </div>
  );
}
