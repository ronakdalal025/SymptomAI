import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultsPage from "./pages/ResultsPage";
import { useState } from "react";
import { symptoms_list } from "./assets/symptoms_list";
import InfoPage from "./pages/InfoPage";
import ReadMore from "./pages/ReadMore";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  // Shared state kept at top-level so routed pages can share/update it
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [availableSymptoms] = useState(symptoms_list);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [disease, setDisease] = useState();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <script src="https://cdn.tailwindcss.com"></script>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diagnosis" element={
              <DiagnosisPage
                selectedSymptoms={selectedSymptoms}
                setSelectedSymptoms={setSelectedSymptoms}
                setDiagnosisResult={setDiagnosisResult}
                availableSymptoms={availableSymptoms}
              />
            } />
            <Route path="/results" element={
              <ResultsPage
                selectedSymptoms={selectedSymptoms}
                diagnosisResult={diagnosisResult}
                setDisease={setDisease}
              />
            } />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/readmore" element={<ReadMore selectedSymptoms={selectedSymptoms} disease={disease} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
