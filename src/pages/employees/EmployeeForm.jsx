import { useState } from 'react';
import { departments } from '../../data/sampleData';

const empty = {
  name: '', email: '', phone: '', department: 'Engineering',
  position: '', salary: '', status: 'Active', joinDate: '',
  gender: 'Male', dob: '', address: '',
};

export default function EmployeeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial, salary: String(initial.salary) } : empty);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.position.trim()) e.position = 'Position is required';
    if (!form.salary || isNaN(Number(form.salary))) e.salary = 'Valid salary required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, salary: Number(form.salary) });
  };

  const Field = ({ label, name, type = 'text', options, required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {options ? (
        <select
          value={form[name]}
          onChange={e => set(name, e.target.value)}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all"
        >
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[name] || ''}
          onChange={e => set(name, e.target.value)}
          className={`w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 transition-all ${errors[name] ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 dark:border-gray-700 focus:ring-violet-300 dark:focus:ring-violet-700'}`}
        />
      )}
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 space-y-6">
        {/* Personal Info */}
        <div>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Personal Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" required />
            <Field label="Email Address" name="email" type="email" required />
            <Field label="Phone Number" name="phone" type="tel" />
            <Field label="Gender" name="gender" options={['Male','Female','Other']} />
            <Field label="Date of Birth" name="dob" type="date" />
            <Field label="Address" name="address" />
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Job Details */}
        <div>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Job Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Department" name="department" options={departments} />
            <Field label="Position / Title" name="position" required />
            <Field label="Join Date" name="joinDate" type="date" />
            <Field label="Status" name="status" options={['Active','Inactive','On Leave']} />
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-800" />

        {/* Salary */}
        <div>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">Salary Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Monthly Salary (₹)" name="salary" type="number" required />
          </div>
        </div>
      </div>

      <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
        <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors">
          Cancel
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors shadow-sm">
          {initial ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  );
}
