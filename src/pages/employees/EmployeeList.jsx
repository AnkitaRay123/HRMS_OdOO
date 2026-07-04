import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Edit2, Trash2, Eye, Download } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import Badge, { statusColor } from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import EmployeeForm from './EmployeeForm';
import { employees as initialEmployees, departments } from '../../data/sampleData';

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [view, setView] = useState('table'); // 'table' | 'grid'

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === 'All' || e.department === deptFilter;
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleSave = (data) => {
    if (editEmp) {
      setEmployees(emps => emps.map(e => e.id === editEmp.id ? { ...e, ...data } : e));
      setEditEmp(null);
    } else {
      const newEmp = { ...data, id: Date.now(), avatar: null };
      setEmployees(emps => [...emps, newEmp]);
      setShowAdd(false);
    }
  };

  const handleDelete = () => {
    setEmployees(emps => emps.filter(e => e.id !== deleteEmp.id));
    setDeleteEmp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Employee Management</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{employees.length} total employees</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm transition-colors"
          >
            <Download className="w-4 h-4" /> Export
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Employee
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
            placeholder="Search employees..."
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700"
          >
            <option>All</option>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700"
          >
            {['All', 'Active', 'Inactive', 'On Leave'].map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="flex bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            {['table','grid'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-2.5 text-sm transition-colors ${view === v ? 'bg-violet-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {v === 'table' ? '☰' : '⊞'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['Employee', 'Department', 'Position', 'Salary', 'Join Date', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-10 h-10 opacity-30" />
                        <p className="text-sm">No employees found</p>
                      </div>
                    </td>
                  </tr>
                ) : filtered.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} size="md" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</p>
                          <p className="text-xs text-gray-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{emp.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{emp.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">₹{emp.salary.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{emp.joinDate}</td>
                    <td className="px-4 py-3"><Badge label={emp.status} color={statusColor(emp.status)} dot /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => navigate(`/employees/${emp.id}`)} className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditEmp(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteEmp(emp)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp, i) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <Avatar name={emp.name} size="xl" />
                <h4 className="mt-3 font-semibold text-gray-900 dark:text-white">{emp.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{emp.position}</p>
                <p className="text-xs text-gray-400 mt-0.5">{emp.department}</p>
                <div className="mt-3"><Badge label={emp.status} color={statusColor(emp.status)} dot /></div>
              </div>
              <div className="flex gap-2 mt-4 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => navigate(`/employees/${emp.id}`)} className="flex-1 py-2 text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-600 rounded-xl hover:bg-violet-100 transition-colors">View</button>
                <button onClick={() => setEditEmp(emp)} className="flex-1 py-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">Edit</button>
                <button onClick={() => setDeleteEmp(emp)} className="flex-1 py-2 text-xs bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showAdd || !!editEmp} onClose={() => { setShowAdd(false); setEditEmp(null); }} title={editEmp ? 'Edit Employee' : 'Add New Employee'} size="lg">
        <EmployeeForm initial={editEmp} onSave={handleSave} onCancel={() => { setShowAdd(false); setEditEmp(null); }} />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteEmp} onClose={() => setDeleteEmp(null)} title="Delete Employee" size="sm">
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-700 dark:text-gray-200 font-medium">Delete {deleteEmp?.name}?</p>
          <p className="text-sm text-gray-400 mt-1">This action cannot be undone.</p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setDeleteEmp(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">Cancel</button>
            <button onClick={handleDelete} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
