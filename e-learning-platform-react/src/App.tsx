import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { CourseDetails } from "./pages/CourseDetails";
import CourseLessons from "./pages/CourseLessons";
import SearchResults from "./pages/SearchResults";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="courses/:courseId" element={<CourseDetails />} />
            <Route
              path="courses/:courseId/lessons"
              element={<CourseLessons />}
            />
            <Route path="search-results" element={<SearchResults />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
