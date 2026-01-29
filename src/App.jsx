import AiTextToSpeach from "./components/AiTextToSpeach"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import LandingPage from "./components/LandingPage"
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="ai" element={<AiTextToSpeach />} />
        <Route path="*" element={<h1>Not ! found</h1>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App