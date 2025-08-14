import Component from '@/pages/component'
import Home from '@/pages/home'
import { BrowserRouter, Route, Routes } from 'react-router'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        >
          <Route
            path=':componentId'
            element={<Component />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
