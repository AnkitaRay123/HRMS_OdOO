import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend, index = 0 }) {
  const colors = {
    violet:  { icon: 'text-violet-600 dark:text-violet-400',  bg: 'bg-violet-50 dark:bg-violet-900/20',  ring: 'ring-1 ring-violet-100 dark:ring-violet-800'  },
    indigo:  { icon: 'text-indigo-600 dark:text-indigo-400',  bg: 'bg-indigo-50 dark:bg-indigo-900/20',  ring: 'ring-1 ring-indigo-100 dark:ring-indigo-800'  },
    blue:    { icon: 'text-blue-600 dark:text-blue-400',      bg: 'bg-blue-50 dark:bg-blue-900/20',      ring: 'ring-1 ring-blue-100 dark:ring-blue-800'      },
    green:   { icon: 'text-emerald-600 dark:text-emerald-400',bg: 'bg-emerald-50 dark:bg-emerald-900/20',ring: 'ring-1 ring-emerald-100 dark:ring-emerald-800' },
    emerald: { icon: 'text-emerald-600 dark:text-emerald-400',bg: 'bg-emerald-50 dark:bg-emerald-900/20',ring: 'ring-1 ring-emerald-100 dark:ring-emerald-800' },
    red:     { icon: 'text-red-500 dark:text-red-400',        bg: 'bg-red-50 dark:bg-red-900/20',        ring: 'ring-1 ring-red-100 dark:ring-red-800'        },
    orange:  { icon: 'text-orange-500 dark:text-orange-400',  bg: 'bg-orange-50 dark:bg-orange-900/20',  ring: 'ring-1 ring-orange-100 dark:ring-orange-800'  },
    yellow:  { icon: 'text-yellow-600 dark:text-yellow-400',  bg: 'bg-yellow-50 dark:bg-yellow-900/20',  ring: 'ring-1 ring-yellow-100 dark:ring-yellow-800'  },
    pink:    { icon: 'text-pink-600 dark:text-pink-400',      bg: 'bg-pink-50 dark:bg-pink-900/20',      ring: 'ring-1 ring-pink-100 dark:ring-pink-800'      },
    blue_:   { icon: 'text-blue-600 dark:text-blue-400',      bg: 'bg-blue-50 dark:bg-blue-900/20',      ring: 'ring-1 ring-blue-100 dark:ring-blue-800'      },
  };
  const c = colors[color] || colors.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-default"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 ${c.bg} ${c.ring} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-500'}`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
