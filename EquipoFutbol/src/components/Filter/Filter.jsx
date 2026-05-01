export const Filter = ({search,setSearch}) =>{
    return(
        <input
            type="text"
            value={search}
            placeholder="Buscar..."
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-60 pl-10 pr-10 py-2 h-10
            rounded-2xl
            border-2 border-gray-400
            bg-gray-100
            outline-none
            focus:border-gray-800 focus:border-2
            focus:bg-gray-300
            transition
            "
        />
    );
}