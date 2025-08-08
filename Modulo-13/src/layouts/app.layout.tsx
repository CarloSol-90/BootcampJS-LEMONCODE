import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>AHBC</h1>
            <span>online banking</span>
          </div>
          <div className="welcome">
            <span>Bienvenido</span>
          </div>
        </div>
      </header>
      
      <nav className="navbar">
        <ul className="nav-menu">
          <li>
            <Link to="/account-list" className="nav-link">Mis Cuentas</Link>
          </li>
          <li>
            <Link to="/movements/1" className="nav-link">Movimientos</Link>
          </li>
          <li>
            <Link to="/transfer" className="nav-link">Transferencias</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
