
// routes/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/Layouts/AppLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import CoursesList from '../features/courses/pages/CourseList';
import CourseDetail from '../features/courses/pages/CourseDetail';
import Subscriptions from '../features/subscriptions/pages/Subscriptions';
import ProgressDashboard from '../features/progress/pages/ProgressDashboard';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
