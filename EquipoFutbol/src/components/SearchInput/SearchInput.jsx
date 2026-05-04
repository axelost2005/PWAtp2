function SearchInput({ value, onChange, placeholder, label }) {
    return (
        <div className="mb-8">
            <label
                htmlFor="team-search"
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <input
                id="team-search"
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
        </div>
    );
}

export default SearchInput;