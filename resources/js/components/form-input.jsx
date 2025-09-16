export function FormInput({ label, error, type = "text", prefix, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-dark">{label}</label>
      )}

      <div className="flex items-center border border-light rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
        {prefix && (
          <span className="px-3 py-2 text-sm text-dark bg-gray-200 border-r border-light">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className="flex-1 text-sm tracking-wide px-3 py-2 focus:outline-none disabled:bg-[#D3D3D3]"
          {...props}
        />
      </div>

      {error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
}
