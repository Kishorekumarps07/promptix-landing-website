import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BusinessSolutionsPage from './pages/BusinessSolutionsPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import StudentsCollegePage from './pages/StudentsCollegePage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import JoinTeamPage from './pages/JoinTeamPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/business-solutions" element={<BusinessSolutionsPage />} />
                    <Route path="/digital-marketing" element={<DigitalMarketingPage />} />
                    <Route path="/students-college" element={<StudentsCollegePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/company/team" element={<TeamPage />} />
                    <Route path="/company/join-team" element={<JoinTeamPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
