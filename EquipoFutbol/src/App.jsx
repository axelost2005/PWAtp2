import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="equipos/:id" element={<Details />} />

                {/* Rutas públicas de autenticación */}
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Register />} />

                {/* Rutas privadas: redirigen a /login si no hay sesión */}
                <Route element={<ProtectedRoute />}>
                    <Route path="favoritos" element={<Favorites />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
