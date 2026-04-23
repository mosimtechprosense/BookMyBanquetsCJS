import "./App.css"
import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate, useNavigate } from "react-router-dom"
import { AdminAuthProvider } from "./store/AdminAuthContext"
import NotFound from "./components/common/NotFound"
import ScrollToTop from "./ScrollToTop"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UIProvider from "./store/UIContext"
import Home from "./pages/Home"
import BusinessRegister from "./pages/BusinessRegister"
import BusinessLogin from "./pages/BusinessLogin"
import BusinessDashboard from "./pages/BusinessDashboard"
import ServiceRouteGuard from "./routes/ServiceRouteGuard"
import RouteValidator from "./routes/RouteValidator"
import ListingDetailsDynamic from "./pages/ListingDetailsDynamic"
import FAQPage from "./pages/FAQPage"
const DiscountPopup = lazy(() => import("./components/DiscountPopup"))
const RecentSearches = lazy(() => import("./components/RecentSearches"))
const FloatingWhatsApp = lazy(() => import("./components/FloatingWhatsApp"))
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"))
const Services = lazy(() => import("./pages/Services"))
const About = lazy(() => import("./pages/About"))
const WhyUs = lazy(() => import("./pages/WhyUs"))
const Blog = lazy(() => import("./pages/Blog"))
const ContactUs = lazy(() => import("./pages/ContactUs"))
const Terms = lazy(() => import("./pages/Terms"))
const Privacy = lazy(() => import("./pages/Privacy"))







function ConditionalAdminUI({ children }) {
  const location = useLocation();
  const [showWidgets, setShowWidgets] = useState(false)
  const isAdmin = location.pathname.startsWith("/admin");
  const isListingDetails = /^\/.+-in\/.+\/\d+$/.test(location.pathname);

  const hideMainLayout = isAdmin;

  useEffect(() => {
  const timer = setTimeout(() => setShowWidgets(true), 5000)
  return () => clearTimeout(timer)
}, [])

  return (
    <>
      {!hideMainLayout && <Navbar />}
      {!hideMainLayout &&  showWidgets && <Suspense fallback={null}> <DiscountPopup /> </Suspense>}

      {children}

        {!hideMainLayout && !isListingDetails &&  <Suspense fallback={null}> <FloatingWhatsApp /> </Suspense>}
      {!hideMainLayout &&  <Suspense fallback={null}> <RecentSearches /> </Suspense>}
      {!hideMainLayout && <Footer />}
    </>
  );
}


function CleanTrackingParams() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);

      const trackingParams = [
        "gclid",
        "gad_source",
        "gad_campaignid",
        "gbraid",
        "wbraid",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content"
      ];

      let hasTracking = false;

      trackingParams.forEach((param) => {
        if (params.has(param)) {
          params.delete(param);
          hasTracking = true;
        }
      });

      if (hasTracking) {
        const newSearch = params.toString();
        const cleanUrl = newSearch
          ? `${location.pathname}?${newSearch}`
          : location.pathname;

        // ✅ THIS is the key fix
        navigate(cleanUrl, { replace: true });
      }
    }
  }, [location.search]);

  return null;
}




function BlogRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/blogs/${slug}`} replace />
}

function BlogRootRedirect() {
  return <Navigate to="/blogs" replace />
}

function App() {
  return (
    <>
      <BrowserRouter>
      <CleanTrackingParams />
          <AdminAuthProvider>
        <UIProvider>
          <ScrollToTop />

          <ConditionalAdminUI>
              <RouteValidator>
            <Suspense  fallback={<div className="py-20 text-center text-gray-500">Loading...</div>}>
          <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/faq" element={<FAQPage />} />


            <Route path="/blog" element={<BlogRootRedirect />} />
            <Route path="/blog/:slug" element={<BlogRedirect />} />

            <Route path="/blogs/category/:categorySlug" element={<Blog />} />
            <Route path="/blogs/:slug" element={<Blog />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />           

<Route path="/:serviceSlug-in/:localitySlug/:id" element={<ListingDetailsDynamic />} />

<Route path="/:serviceCity/:localitySlug/*" element={<NotFound />} />
<Route path="/:serviceCity/:localitySlug" element={<ServiceRouteGuard />} />
<Route path="/:serviceCity" element={<ServiceRouteGuard />} />


<Route path="/business/register" element={<BusinessRegister />} />
<Route path="/business/login" element={<BusinessLogin />} />
<Route path="/business/dashboard" element={<BusinessDashboard />} />

<Route path="*" element={<NotFound />} />
<Route path="/404/*" element={<NotFound />} />
          </Routes>
          
          </Suspense>
          </RouteValidator>
          </ConditionalAdminUI>
        </UIProvider>
        </AdminAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App