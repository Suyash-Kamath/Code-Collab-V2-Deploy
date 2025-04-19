import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import Index from "./pages/Index"

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/join" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
        </>
    )
}

export default App
