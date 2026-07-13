import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">⚙️ Admin</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/productos" className="sidebar-link">
                📦 Productos
              </Link>
            </li>
            <li>
              <Link to="/" className="sidebar-link back-link">
                ← Volver a la tienda
              </Link>
            </li>
          </ul>
        </nav>
        <button className="sidebar-logout" onClick={logout}>
          🚪 Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;