export function FormCheckbox({ label, ...props }) {
    return (
        <label className="flex items-center gap-2 text-sm text-dark">
            <input
                type="checkbox"
                className="appearance-none rounded checked:bg-primary size-[18px] border border-light"
                {...props}
            />
            {label}
        </label>
    );
}
