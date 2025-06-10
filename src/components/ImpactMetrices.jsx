import { useEffect, useState } from 'react';
import { FaClock, FaHandsHelping, FaHeart, FaUsers } from 'react-icons/fa';

// Metric data with target numbers
const metrics = [
  {
    icon: <FaUsers className="w-8 h-8 text-teal-600" />,
    label: 'Volunteers',
    target: 12500,
    suffix: '+',
  },
  {
    icon: <FaClock className="w-8 h-8 text-teal-600" />,
    label: 'Hours Volunteered',
    target: 89000,
    suffix: '+',
  },
  {
    icon: <FaHeart className="w-8 h-8 text-teal-600" />,
    label: 'Donations Raised',
    target: 45,
    prefix: '₹',
    suffix: ' Lakhs+',
  },
  {
    icon: <FaHandsHelping className="w-8 h-8 text-teal-600" />,
    label: 'NGOs Supported',
    target: 320,
    suffix: '+',
  },
];

// Helper function to format numbers
const formatNumber = (n, prefix = '', suffix = '') => {
  return `${prefix || ''}${n.toLocaleString()}${suffix || ''}`;
};

const MetricItem = ({ icon, label, target, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 10);

    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className=" p-6 rounded-xl dark:bg-gray-700/50  shadow-md hover:shadow-lg transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
        {formatNumber(count, prefix, suffix)}
      </div>
      <div className="text-gray-600 dark:text-white/50 text-sm mt-1">{label}</div>
    </div>
  );
};

const ImpactMetrics = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Collective Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((metric, index) => (
            <MetricItem
              key={index}
              icon={metric.icon}
              label={metric.label}
              target={metric.target}
              prefix={metric.prefix}
              suffix={metric.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
