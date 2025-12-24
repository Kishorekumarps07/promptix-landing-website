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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ApplyPage from './pages/ApplyPage';
import ApplySuccessPage from './pages/ApplySuccessPage';
import BlogPage from './pages/BlogPage';
import BlogPostAIEra from './pages/BlogPostAIEra';
import BlogPostDigitalBranding from './pages/BlogPostDigitalBranding';
import BlogPostFutureDomains from './pages/BlogPostFutureDomains';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ContactsManagementPage from './pages/admin/ContactsManagementPage';
import InternshipsManagementPage from './pages/admin/InternshipsManagementPage';

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
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/apply" element={<ApplyPage />} />
                    <Route path="/apply-success" element={<ApplySuccessPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/how-ai-is-redefining-the-future" element={<BlogPostAIEra />} />
                    <Route path="/blog/the-smart-way-to-build-a-digital-brand" element={<BlogPostDigitalBranding />} />
                    <Route path="/blog/in-demand-skill-domains-for-students" element={<BlogPostFutureDomains />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/contacts"
                        element={
                            <ProtectedRoute>
                                <ContactsManagementPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/internships"
                        element={
                            <ProtectedRoute>
                                <InternshipsManagementPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
