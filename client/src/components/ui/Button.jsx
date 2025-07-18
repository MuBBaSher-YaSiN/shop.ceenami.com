export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full py-2 sm:py-3 bg-[#d5b56e] hover:bg-[#b79a53] text-black font-semibold rounded transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
