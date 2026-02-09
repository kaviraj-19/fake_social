
import React from 'react';
import { RiskLevel } from '../types';

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const styles = {
    [RiskLevel.LOW]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    [RiskLevel.MEDIUM]: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    [RiskLevel.HIGH]: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    [RiskLevel.CRITICAL]: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[level]}`}>
      {level}
    </span>
  );
};

export default RiskBadge;
