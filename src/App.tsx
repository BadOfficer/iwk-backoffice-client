import { Outlet } from 'react-router';
import { Sidebar } from './common/layout/sidebar';
import { Header } from './common/layout/header';

function App() {
  return (
    <div className="content">
      <Header />

      <Sidebar />

      <Outlet />
    </div>
  );
}

export default App;
