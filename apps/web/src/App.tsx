import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import './App.css';
import Register from "./pages/Register.tsx";

function App() {
  return (
    <MainLayout>
        <Login />
        <Register />
    </MainLayout>
  );
}

export default App
