import React from 'react'; 
import Header from './components/ui/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
