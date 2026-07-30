import React from 'react';
import { NavLink, Outlet } from 'react-router';

export const RootLayout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/app" end>
                {({ isActive }) => (isActive ? 'Dashboard (Ativo)' : 'Dashboard')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/app/produtos">
                {({ isActive }) => (isActive ? 'Produtos (Ativo)' : 'Produtos')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
