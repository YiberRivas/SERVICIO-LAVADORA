import React, { useState } from 'react';

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'María González',
      email: 'maria@email.com',
      role: 'Cliente',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-11-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      role: 'Cliente Premium',
      status: 'active',
      joinDate: '2024-02-10',
      lastLogin: '2024-11-19',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana@email.com',
      role: 'Cliente',
      status: 'inactive',
      joinDate: '2024-03-22',
      lastLogin: '2024-10-15',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      role: 'Administrador',
      status: 'active',
      joinDate: '2024-01-05',
      lastLogin: '2024-11-21',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    premium: users.filter(u => u.role.includes('Premium')).length,
    newThisMonth: 12
  };

  return (
    <div className="users-section">
      {/* Header con Estadísticas */}
      <div className="section-header">
        <div className="header-content">
          <h1>Gestión de Usuarios</h1>
          <p>Administra los clientes y sus permisos</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-user-plus"></i>
          Nuevo Usuario
        </button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Usuarios</div>
          </div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            12%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">Usuarios Activos</div>
          </div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            8%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-crown"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.premium}</div>
            <div className="stat-label">Clientes Premium</div>
          </div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            15%
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-clock"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.newThisMonth}</div>
            <div className="stat-label">Nuevos Este Mes</div>
          </div>
          <div className="stat-trend positive">
            <i className="fas fa-arrow-up"></i>
            5%
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="filters-bar">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
          <button className="btn btn-outline">
            <i className="fas fa-download"></i>
            Exportar
          </button>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="data-table modern-table">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha de Registro</th>
                <th>Último Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase().includes('premium') ? 'premium' : 'basic'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                  <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon" title="Ver detalles">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn-icon btn-danger" title="Eliminar">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button className="pagination-btn" disabled>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Usuarios;