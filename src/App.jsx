import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DashboardPage from '@/components/pages/DashboardPage'
import EditorPage from '@/components/pages/EditorPage'
import TemplatesPage from '@/components/pages/TemplatesPage'
import SettingsPage from '@/components/pages/SettingsPage'
import PreviewPage from '@/components/pages/PreviewPage'
import Layout from '@/components/organisms/Layout'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/editor/:siteId" element={<EditorPage />} />
          <Route path="/preview/:siteId" element={<PreviewPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="text-sm"
          bodyClassName="text-sm"
          style={{ zIndex: 9999 }}
        />
      </Router>
    </DndProvider>
  )
}

export default App