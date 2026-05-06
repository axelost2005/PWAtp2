import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="equipos/:id" element={<Details />} />
                <Route path="favoritos" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;