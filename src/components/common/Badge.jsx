const variants = {
  green:  'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  red:    'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500',
  blue:   'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
  orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  gray:   'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
};

const dotColors = {
  green:  'bg-emerald-500',
  red:    'bg-red-500',
  yellow: 'bg-yellow-500',
  blue:   'bg-blue-500',
  violet: 'bg-violet-500',
  orange: 'bg-orange-500',
  gray:   'bg-gray-400',
};

export default function Badge({ label, color = 'gray', dot = false, size = 'sm' }) {
  const sz = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${variants[color] || variants.gray} ${sz}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[color] || dotColors.gray}`} />}
      {label}
    </span>
  );
}

// Helpers
export function statusColor(status) {
  const map = {
    'Present': 'green', 'Active': 'green', 'Approved': 'green', 'Paid': 'green',
    'Absent': 'red', 'Inactive': 'red', 'Rejected': 'red',
    'Late': 'yellow', 'On Leave': 'yellow',
    'Leave': 'blue', 'Pending': 'orange',
  };
  return map[status] || 'gray';
}
