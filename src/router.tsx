import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { RequireAuth } from './components/layout/RequireAuth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

/** Pages other than the home page are split into their own chunks. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({ Component: (await load()).default })

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'calculator', lazy: page(() => import('./pages/Calculator')) },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: 'login', lazy: page(() => import('./pages/SignIn')) },
      { path: 'signup', lazy: page(() => import('./pages/SignUp')) },
      {
        element: <RequireAuth />,
        children: [
          { path: 'application', lazy: page(() => import('./pages/Application')) },
          { path: 'application/new', lazy: page(() => import('./pages/Apply')) },
        ],
      },
      // Addresses from the previous version of the site.
      { path: 'application/forms', element: <Navigate to="/application" replace /> },
      { path: 'application/agreement', element: <Navigate to="/application" replace /> },
      { path: 'archive/*', element: <Navigate to="/application" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
