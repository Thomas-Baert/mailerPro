import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import Register from "./pages/Register.tsx";
import AdminUniversities from "./pages/AdminUniversities.tsx";
import RoleGuard from "./components/RoleGuard.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter basename="/mailerpro">
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/admin/universities" element={
                        <RoleGuard allowedRoles={['GLOBAL_ADMIN']}>
                            <AdminUniversities />
                        </RoleGuard>
                    } />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App
