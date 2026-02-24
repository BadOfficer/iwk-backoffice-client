import { Outlet } from 'react-router';
import { Sidebar } from './common/layout/sidebar';

function App() {
  return (
    <div>
      <Sidebar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
