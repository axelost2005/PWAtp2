function SearchInput({ value, onChange, placeholder, label }) {
    return (
        <div className="mb-10">
            <label
                htmlFor="team-search"
                className="mb-2 block text-sm font-semibold text-slate-200"
            >
                {label}
            </label>

            <div className="relative max-w-xl">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                </svg>

                <input
                    id="team-search"
                    type="search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-400 backdrop-blur-sm transition outline-none focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                />
            </div>
        </div>
    );
}

export default SearchInput;
