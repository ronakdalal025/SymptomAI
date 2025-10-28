import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DiagnosisPage from "./pages/DiagnosisPage";
import ResultsPage from "./pages/ResultsPage";
import { useCallback, useState } from "react";
import { symptoms_list } from "./assets/symptoms_list";


function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'diagnosis', 'results'
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const [availableSymptoms] = useState(symptoms_list); 

  // State for the AI diagnosis result fetched after analysis
  const [diagnosisResult, setDiagnosisResult] = useState(null); 

  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
    // When navigating back to diagnosis, keep symptoms, otherwise, reset for a clean start
    if (page === 'home') {
      setSelectedSymptoms([]);
      setDiagnosisResult(null);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'diagnosis':
        return (
          <DiagnosisPage 
            navigateTo={navigateTo} 
            selectedSymptoms={selectedSymptoms} 
            setSelectedSymptoms={setSelectedSymptoms} 
            setDiagnosisResult={setDiagnosisResult}
            availableSymptoms={availableSymptoms}
          />
        );
      case 'results':
        return <ResultsPage navigateTo={navigateTo} selectedSymptoms={selectedSymptoms} diagnosisResult={diagnosisResult} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App
