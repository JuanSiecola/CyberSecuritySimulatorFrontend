import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ActividadPage from './pages/ActividadPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <DashboardPage />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/actividad"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <ActividadPage />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="*"
                element={
                    <Navigate
                        to={localStorage.getItem('token') ? '/dashboard' : '/login'}
                        replace
                    />
                }
            />
        </Routes>
    )
}