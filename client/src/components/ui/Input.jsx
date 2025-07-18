export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className={`w-full text-xs sm:text-sm md:text-base px-3 py-2 sm:p-3 rounded bg-white/90 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d5b56e] ${className}`}
      {...props}
    />
  );
}
