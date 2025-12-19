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
import ApplyPage from './pages/ApplyPage';
import ApplySuccessPage from './pages/ApplySuccessPage';
import CareersApplyPage from './pages/CareersApplyPage';
import BlogPage from './pages/BlogPage';
import BlogPostAIEra from './pages/BlogPostAIEra';
import BlogPostDigitalBranding from './pages/BlogPostDigitalBranding';
import BlogPostFutureDomains from './pages/BlogPostFutureDomains';

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
                    <Route path="/apply" element={<ApplyPage />} />
                    <Route path="/apply-success" element={<ApplySuccessPage />} />
                    <Route path="/careers/apply" element={<CareersApplyPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/fast-growth-ai-era" element={<BlogPostAIEra />} />
                    <Route path="/blog/brand-your-business-digital-world" element={<BlogPostDigitalBranding />} />
                    <Route path="/blog/best-domains-for-future" element={<BlogPostFutureDomains />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
