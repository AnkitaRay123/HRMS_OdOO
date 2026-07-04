const bgColors = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500', 'bg-orange-500',
  'bg-pink-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500',
];

function getColor(name = '') {
  let sum = 0;
  for (let c of name) sum += c.charCodeAt(0);
  return bgColors[sum % bgColors.length];
}

export default function Avatar({ name = '', size = 'md', className = '' }) {
  const sizes = {
    xs:  'w-6 h-6 text-[10px]',
    sm:  'w-8 h-8 text-xs',
    md:  'w-10 h-10 text-sm',
    lg:  'w-12 h-12 text-base',
    xl:  'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const color = getColor(name);

  return (
    <div className={`${sizes[size] || sizes.md} ${color} rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white shadow-sm ${className}`}>
      {initials}
    </div>
  );
}
