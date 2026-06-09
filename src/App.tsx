import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Marketing from './pages/Marketing'
import SaaS from './pages/SaaS'
import Ecommerce from './pages/Ecommerce'
import MobileApp from './pages/MobileApp'
import Corporate from './pages/Corporate'
import ProjectDetail from './pages/ProjectDetail'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/saas" element={<SaaS />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/mobile-app" element={<MobileApp />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Route>
    </Routes>
  )
}
