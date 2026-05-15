import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
    test("renderiza el label y el placeholder correctamente", () => {
        render(
            <SearchInput
                value=""
                onChange={() => { }}
                placeholder="Buscar equipos..."
                label="Buscar equipo"
            />
        );
        expect(screen.getByText("Buscar equipo")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Buscar equipos...")).toBeInTheDocument();
    });

    test("muestra el valor recibido por props", () => {
        render(
            <SearchInput
                value="Boca Juniors"
                onChange={() => { }}
                placeholder="Buscar equipos..."
                label="Buscar equipo" />
        );
        const input = screen.getByRole("searchbox");
        expect(input).toHaveValue("Boca Juniors");
    });

    test("llama a onChange con el nuevo valor cuando el usuario escribe", async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
            <SearchInput
                value=""
                onChange={handleChange}
                placeholder="Buscar equipos..."
                label="Buscar equipo"
            />
        );

        const input = screen.getByRole("searchbox");
        await user.type(input, "river");

        expect(handleChange).toHaveBeenLastCalledWith("r");

        expect(handleChange).toHaveBeenCalledTimes(5);
    });

    test("el input está asociado correctamente al label", () => {
        render(
            <SearchInput
                value=""
                onChange={() => { }}
                placeholder="Buscar equipos..."
                label="Buscar equipo" />
        );

        const input = screen.getByLabelText("Buscar equipo");
        expect(input).toBeInTheDocument();
    });
});