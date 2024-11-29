const LoadingSkeleton = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
    />
  );
};

export default LoadingSkeleton; 