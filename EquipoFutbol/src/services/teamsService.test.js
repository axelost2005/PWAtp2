import { getTeams, searchTeams } from "./teamsService";

// equipos de ejemplo que simulamos que devuelve la API (array plano)
const equiposMock = [
    { id: "1", name: "Boca Juniors" },
    { id: "2", name: "Boca Unidos" },
];

describe("teamsService - búsqueda contra la API", () => {
    beforeEach(() => {
        // mockeamos el fetch global antes de cada test
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("searchTeams consulta GET /equipos con search, page y limit", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => equiposMock,
        });

        await searchTeams("boca", 1, 8);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/equipos?search=boca&page=1&limit=8")
        );
    });

    test("searchTeams devuelve el array plano que responde la API", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => equiposMock,
        });

        const resultado = await searchTeams("boca", 1, 8);

        expect(Array.isArray(resultado)).toBe(true);
        expect(resultado).toEqual(equiposMock);
    });

    test("searchTeams manda el texto tal cual (la API resuelve el case-insensitive)", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => equiposMock,
        });

        await searchTeams("Boca", 1, 8);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("search=Boca")
        );
    });

    test("searchTeams codifica los espacios del término de búsqueda", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => [],
        });

        await searchTeams("san lorenzo", 1, 8);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("search=san%20lorenzo")
        );
    });

    test("searchTeams respeta la paginación pidiendo otra página", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => equiposMock,
        });

        await searchTeams("boca", 2, 8);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("search=boca&page=2&limit=8")
        );
    });

    test("searchTeams sin resultados devuelve un array vacío", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => [],
        });

        const resultado = await searchTeams("zzzzz", 1, 8);

        expect(resultado).toEqual([]);
    });

    test("searchTeams lanza error cuando la API responde con fallo", async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 500,
        });

        await expect(searchTeams("boca", 1, 8)).rejects.toThrow("SEARCH_TEAMS_ERROR");
    });

    test("getTeams (campo vacío) pide el listado general, sin parámetro search", async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => equiposMock,
        });

        await getTeams(1, 8);

        const urlConsultada = global.fetch.mock.calls[0][0];
        expect(urlConsultada).toContain("/equipos?page=1&limit=8");
        expect(urlConsultada).not.toContain("search=");
    });
});
