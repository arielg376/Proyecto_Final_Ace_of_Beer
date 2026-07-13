import React from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import ProductManager from '../components/admin/ProductManager';

const AdminPage = () => {
  return (
    <AdminLayout>
      <ProductManager />
    </AdminLayout>
  );
};

export default AdminPage;