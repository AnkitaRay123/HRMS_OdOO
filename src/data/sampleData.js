// ─── Sample Data ───────────────────────────────────────────────────────────────

export const currentUser = {
  id: 1,
  name: 'Ankita Sharma',
  email: 'admin@hrms.com',
  role: 'Admin',
  department: 'Human Resources',
  avatar: null,
  joinDate: '2022-01-15',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra',
};

export const employees = [
  { id: 1,  name: 'Ankita Sharma',   email: 'ankita@hrms.com',   phone: '+91 98765 43210', department: 'Human Resources', position: 'HR Manager',        salary: 85000,  status: 'Active',   joinDate: '2022-01-15', avatar: null, gender: 'Female', dob: '1990-05-12' },
  { id: 2,  name: 'Rahul Verma',     email: 'rahul@hrms.com',    phone: '+91 91234 56789', department: 'Engineering',      position: 'Senior Developer',  salary: 95000,  status: 'Active',   joinDate: '2021-03-10', avatar: null, gender: 'Male',   dob: '1988-08-22' },
  { id: 3,  name: 'Priya Singh',     email: 'priya@hrms.com',    phone: '+91 87654 32109', department: 'Marketing',        position: 'Marketing Lead',    salary: 78000,  status: 'Active',   joinDate: '2020-07-05', avatar: null, gender: 'Female', dob: '1992-11-30' },
  { id: 4,  name: 'Arjun Mehta',     email: 'arjun@hrms.com',    phone: '+91 99887 76654', department: 'Finance',          position: 'Finance Analyst',   salary: 72000,  status: 'Active',   joinDate: '2023-02-20', avatar: null, gender: 'Male',   dob: '1995-03-14' },
  { id: 5,  name: 'Sneha Patel',     email: 'sneha@hrms.com',    phone: '+91 76543 21098', department: 'Engineering',      position: 'QA Engineer',       salary: 68000,  status: 'Active',   joinDate: '2022-09-01', avatar: null, gender: 'Female', dob: '1993-07-19' },
  { id: 6,  name: 'Vikram Rao',      email: 'vikram@hrms.com',   phone: '+91 85432 10987', department: 'Sales',            position: 'Sales Executive',   salary: 62000,  status: 'Active',   joinDate: '2023-05-15', avatar: null, gender: 'Male',   dob: '1991-12-05' },
  { id: 7,  name: 'Neha Gupta',      email: 'neha@hrms.com',     phone: '+91 95432 10987', department: 'Operations',       position: 'Operations Lead',   salary: 74000,  status: 'On Leave', joinDate: '2021-11-08', avatar: null, gender: 'Female', dob: '1989-04-25' },
  { id: 8,  name: 'Amit Kumar',      email: 'amit@hrms.com',     phone: '+91 89765 43210', department: 'Engineering',      position: 'DevOps Engineer',   salary: 88000,  status: 'Active',   joinDate: '2020-12-01', avatar: null, gender: 'Male',   dob: '1987-09-10' },
  { id: 9,  name: 'Kavya Nair',      email: 'kavya@hrms.com',    phone: '+91 78654 32109', department: 'Design',           position: 'UI/UX Designer',    salary: 71000,  status: 'Active',   joinDate: '2022-06-20', avatar: null, gender: 'Female', dob: '1994-01-28' },
  { id: 10, name: 'Rohan Joshi',     email: 'rohan@hrms.com',    phone: '+91 96543 21098', department: 'Finance',          position: 'Senior Accountant', salary: 76000,  status: 'Inactive', joinDate: '2019-08-14', avatar: null, gender: 'Male',   dob: '1986-06-17' },
  { id: 11, name: 'Divya Reddy',     email: 'divya@hrms.com',    phone: '+91 84321 09876', department: 'Marketing',        position: 'Content Strategist',salary: 65000,  status: 'Active',   joinDate: '2023-01-10', avatar: null, gender: 'Female', dob: '1996-10-03' },
  { id: 12, name: 'Sanjay Pillai',   email: 'sanjay@hrms.com',   phone: '+91 93210 98765', department: 'Sales',            position: 'Sales Manager',     salary: 90000,  status: 'Active',   joinDate: '2020-03-25', avatar: null, gender: 'Male',   dob: '1985-02-20' },
];

export const departments = ['Human Resources', 'Engineering', 'Marketing', 'Finance', 'Sales', 'Operations', 'Design'];

export const attendanceData = [
  { date: '2026-06-28', employee: 'Ankita Sharma',  checkIn: '09:02', checkOut: '18:05', status: 'Present', hours: '9h 03m' },
  { date: '2026-06-28', employee: 'Rahul Verma',    checkIn: '09:45', checkOut: '18:30', status: 'Late',    hours: '8h 45m' },
  { date: '2026-06-28', employee: 'Priya Singh',    checkIn: '--',    checkOut: '--',    status: 'Absent',  hours: '--'     },
  { date: '2026-06-28', employee: 'Arjun Mehta',    checkIn: '08:55', checkOut: '17:55', status: 'Present', hours: '9h 00m' },
  { date: '2026-06-28', employee: 'Sneha Patel',    checkIn: '--',    checkOut: '--',    status: 'Leave',   hours: '--'     },
  { date: '2026-06-29', employee: 'Ankita Sharma',  checkIn: '09:00', checkOut: '18:00', status: 'Present', hours: '9h 00m' },
  { date: '2026-06-29', employee: 'Rahul Verma',    checkIn: '09:05', checkOut: '18:10', status: 'Present', hours: '9h 05m' },
  { date: '2026-06-29', employee: 'Priya Singh',    checkIn: '09:30', checkOut: '18:00', status: 'Late',    hours: '8h 30m' },
  { date: '2026-06-29', employee: 'Arjun Mehta',    checkIn: '--',    checkOut: '--',    status: 'Absent',  hours: '--'     },
  { date: '2026-06-30', employee: 'Ankita Sharma',  checkIn: '09:10', checkOut: '18:15', status: 'Present', hours: '9h 05m' },
  { date: '2026-06-30', employee: 'Rahul Verma',    checkIn: '--',    checkOut: '--',    status: 'Leave',   hours: '--'     },
  { date: '2026-06-30', employee: 'Sneha Patel',    checkIn: '09:00', checkOut: '18:00', status: 'Present', hours: '9h 00m' },
];

export const attendanceChartData = [
  { day: 'Mon', present: 9, absent: 2, late: 1 },
  { day: 'Tue', present: 10, absent: 1, late: 1 },
  { day: 'Wed', present: 8, absent: 3, late: 1 },
  { day: 'Thu', present: 11, absent: 1, late: 0 },
  { day: 'Fri', present: 7, absent: 3, late: 2 },
  { day: 'Sat', present: 5, absent: 7, late: 0 },
];

export const leaveRequests = [
  { id: 1,  employee: 'Rahul Verma',   type: 'Sick Leave',    from: '2026-07-05', to: '2026-07-06', days: 2, reason: 'Fever and cold',          status: 'Pending',  appliedOn: '2026-07-03' },
  { id: 2,  employee: 'Priya Singh',   type: 'Annual Leave',  from: '2026-07-10', to: '2026-07-14', days: 5, reason: 'Family vacation',          status: 'Approved', appliedOn: '2026-07-01' },
  { id: 3,  employee: 'Sneha Patel',   type: 'Casual Leave',  from: '2026-07-08', to: '2026-07-08', days: 1, reason: 'Personal work',            status: 'Pending',  appliedOn: '2026-07-04' },
  { id: 4,  employee: 'Vikram Rao',    type: 'Sick Leave',    from: '2026-06-28', to: '2026-06-30', days: 3, reason: 'Medical procedure',        status: 'Approved', appliedOn: '2026-06-25' },
  { id: 5,  employee: 'Neha Gupta',    type: 'Annual Leave',  from: '2026-07-15', to: '2026-07-20', days: 6, reason: 'Wedding anniversary trip', status: 'Rejected', appliedOn: '2026-07-02' },
  { id: 6,  employee: 'Amit Kumar',    type: 'Paternity',     from: '2026-07-12', to: '2026-07-19', days: 8, reason: 'Newborn care',             status: 'Pending',  appliedOn: '2026-07-04' },
  { id: 7,  employee: 'Kavya Nair',    type: 'Casual Leave',  from: '2026-07-09', to: '2026-07-09', days: 1, reason: 'Doctor appointment',       status: 'Approved', appliedOn: '2026-07-03' },
  { id: 8,  employee: 'Rohan Joshi',   type: 'Annual Leave',  from: '2026-07-22', to: '2026-07-25', days: 4, reason: 'Home renovation',          status: 'Pending',  appliedOn: '2026-07-04' },
];

export const leaveBalance = [
  { type: 'Annual Leave',  total: 18, used: 7,  remaining: 11 },
  { type: 'Sick Leave',    total: 10, used: 2,  remaining: 8  },
  { type: 'Casual Leave',  total: 6,  used: 1,  remaining: 5  },
  { type: 'Maternity',     total: 90, used: 0,  remaining: 90 },
  { type: 'Paternity',     total: 15, used: 0,  remaining: 15 },
];

export const payrollData = [
  { id: 1, employee: 'Ankita Sharma', month: 'June 2026', basic: 85000, hra: 25500, allowances: 8500,  deductions: 10200, net: 108800, status: 'Paid',    paidOn: '2026-06-30' },
  { id: 2, employee: 'Rahul Verma',   month: 'June 2026', basic: 95000, hra: 28500, allowances: 9500,  deductions: 11400, net: 121600, status: 'Paid',    paidOn: '2026-06-30' },
  { id: 3, employee: 'Priya Singh',   month: 'June 2026', basic: 78000, hra: 23400, allowances: 7800,  deductions: 9360,  net:  99840, status: 'Paid',    paidOn: '2026-06-30' },
  { id: 4, employee: 'Arjun Mehta',   month: 'June 2026', basic: 72000, hra: 21600, allowances: 7200,  deductions: 8640,  net:  92160, status: 'Paid',    paidOn: '2026-06-30' },
  { id: 5, employee: 'Sneha Patel',   month: 'June 2026', basic: 68000, hra: 20400, allowances: 6800,  deductions: 8160,  net:  87040, status: 'Pending', paidOn: '--'         },
  { id: 6, employee: 'Vikram Rao',    month: 'June 2026', basic: 62000, hra: 18600, allowances: 6200,  deductions: 7440,  net:  79360, status: 'Pending', paidOn: '--'         },
  { id: 7, employee: 'Ankita Sharma', month: 'May 2026',  basic: 85000, hra: 25500, allowances: 8500,  deductions: 10200, net: 108800, status: 'Paid',    paidOn: '2026-05-31' },
  { id: 8, employee: 'Rahul Verma',   month: 'May 2026',  basic: 95000, hra: 28500, allowances: 9500,  deductions: 11400, net: 121600, status: 'Paid',    paidOn: '2026-05-31' },
];

export const payrollChartData = [
  { month: 'Jan', amount: 980000 },
  { month: 'Feb', amount: 995000 },
  { month: 'Mar', amount: 1020000 },
  { month: 'Apr', amount: 1005000 },
  { month: 'May', amount: 1050000 },
  { month: 'Jun', amount: 1080000 },
];

export const recentActivities = [
  { id: 1, type: 'leave',      user: 'Rahul Verma',   action: 'applied for Sick Leave',              time: '2 hours ago',  icon: 'FileText' },
  { id: 2, type: 'attendance', user: 'Priya Singh',   action: 'checked in at 09:30 AM',              time: '3 hours ago',  icon: 'Clock' },
  { id: 3, type: 'employee',   user: 'Admin',         action: 'added new employee Divya Reddy',       time: '5 hours ago',  icon: 'UserPlus' },
  { id: 4, type: 'payroll',    user: 'Admin',         action: 'processed June payroll',               time: '1 day ago',    icon: 'DollarSign' },
  { id: 5, type: 'leave',      user: 'Kavya Nair',    action: 'leave approved by Admin',              time: '1 day ago',    icon: 'CheckCircle' },
  { id: 6, type: 'attendance', user: 'Vikram Rao',    action: 'marked absent for 28 Jun',             time: '2 days ago',   icon: 'XCircle' },
];

export const reportStats = {
  employee:   { total: 12, active: 10, inactive: 1, onLeave: 1, newThisMonth: 2 },
  attendance: { avgPresent: 85, avgAbsent: 10, avgLate: 5, avgLeave: 5 },
  leave:      { pending: 4, approved: 3, rejected: 1, totalDaysTaken: 31 },
  payroll:    { totalPaid: 611360, pending: 166400, totalEmployees: 12 },
};
