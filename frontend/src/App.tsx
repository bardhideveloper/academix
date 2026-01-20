import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./features/courses/pages/CourseList";
import WishlistList from "./features/wishlist/pages/WishlistList";
import Subscriptions from "./features/subscriptions/pages/Subscriptions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/wishlist" element={<WishlistList />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </Router>
  );
}

export default App;
