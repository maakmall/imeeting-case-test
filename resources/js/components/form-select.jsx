export function FormSelect({ label, error, options = [], ...props }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-dark">{label}</label>
            <select
                className="text-[#9E9E9E] text-sm tracking-wide border border-light rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none appearance-none bg-no-repeat"
                {...props}
            >
                <option value="">Pilih {label}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && (<div className="text-red-500 text-xs">{error}</div>)}
        </div>
    );
}
