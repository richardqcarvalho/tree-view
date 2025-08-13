import Home from '@/pages/home'
import { BrowserRouter, Route, Routes } from 'react-router'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  )
}
