export default function LoadingSpinner({ size = 'md', center = false }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const spinner = (
    <div className={`${sizes[size] || sizes.md} border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin`} />
  );
  if (center) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        {spinner}
      </div>
    );
  }
  return spinner;
}
