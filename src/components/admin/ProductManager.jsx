import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import './ProductManager.css';

const ProductManager = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    categoria: '',
    imagen: ''
  });

  // READ: Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
      setError(null);
    } catch (err) {
      setError('❌ Error al cargar productos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Agregar producto
  const addProduct = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert('❌ ' + validationError);
      return;
    }
    
    try {
      setLoading(true);
      await addDoc(collection(db, 'productos'), {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        createdAt: new Date().toISOString()
      });
      resetForm();
      await loadProducts();
      alert('✅ Producto agregado con éxito');
    } catch (err) {
      setError('❌ Error al agregar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Editar producto
  const updateProduct = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert('❌ ' + validationError);
      return;
    }
    
    try {
      setLoading(true);
      const productRef = doc(db, 'productos', editingProduct.id);
      await updateDoc(productRef, {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock)
      });
      resetForm();
      await loadProducts();
      alert('✅ Producto actualizado con éxito');
    } catch (err) {
      setError('❌ Error al actualizar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Eliminar producto
  const deleteProduct = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'productos', productToDelete));
      setShowConfirmModal(false);
      setProductToDelete(null);
      await loadProducts();
      alert('✅ Producto eliminado con éxito');
    } catch (err) {
      setError('❌ Error al eliminar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      precio: '',
      descripcion: '',
      stock: '',
      categoria: '',
      imagen: ''
    });
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      descripcion: product.descripcion,
      stock: product.stock,
      categoria: product.categoria || '',
      imagen: product.imagen || ''
    });
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) return 'El nombre es obligatorio';
    if (Number(formData.precio) <= 0) return 'El precio debe ser mayor a 0';
    if (Number(formData.stock) < 0) return 'El stock no puede ser negativo';
    if (!formData.descripcion.trim()) return 'La descripción es obligatoria';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(e);
    } else {
      addProduct(e);
    }
  };

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  // Si no está logueado
  if (!user) {
    return (
      <div className="admin-restricted">
        <h2>🔒 Acceso Restringido</h2>
        <p>Debes iniciar sesión para administrar productos.</p>
        <a href="/login" className="btn-login-link">Iniciar Sesión</a>
      </div>
    );
  }

  return (
    <div className="product-manager">
      <h1>📦 Gestión de Productos</h1>
      <p className="subtitle">Administrá el catálogo de cervezas de Ace of Beer</p>
      
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{editingProduct ? '✏️ Editar Producto' : '➕ Agregar Nueva Cerveza'}</h2>
        
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nombre de la cerveza *"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Precio * (ej: 1350)"
            value={formData.precio}
            onChange={(e) => setFormData({...formData, precio: e.target.value})}
            required
            min="1"
          />
          <input
            type="number"
            placeholder="Stock *"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            required
            min="0"
          />
          <input
            type="text"
            placeholder="Categoría (ej: IPA, Stout)"
            value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
          />
          <input
            type="text"
            placeholder="URL de la imagen (ej: /img/ipa.jpeg)"
            value={formData.imagen}
            onChange={(e) => setFormData({...formData, imagen: e.target.value})}
            className="full-width"
          />
          <textarea
            placeholder="Descripción de la cerveza *"
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            required
            rows="3"
            className="full-width"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? '⏳ Procesando...' : editingProduct ? '✏️ Actualizar' : '➕ Agregar'}
          </button>
          {editingProduct && (
            <button type="button" className="btn-cancel" onClick={resetForm}>
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>

      {error && <div className="error-message">❌ {error}</div>}

      {loading && <div className="loading-message">⏳ Cargando productos...</div>}

      {!loading && (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.imagen && (
                <img src={product.imagen} alt={product.nombre} />
              )}
              <h3>{product.nombre}</h3>
              <p>💰 ${product.precio}</p>
              <p>📦 Stock: {product.stock}</p>
              {product.categoria && <p>🏷️ {product.categoria}</p>}
              <p className="product-desc">{product.descripcion?.substring(0, 80)}...</p>
              <div className="product-actions">
                <button className="btn-edit" onClick={() => handleEdit(product)}>
                  ✏️ Editar
                </button>
                <button className="btn-delete" onClick={() => {
                  setProductToDelete(product.id);
                  setShowConfirmModal(true);
                }}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="empty-message">
          <p>📭 No hay productos aún. ¡Agregá tu primera cerveza!</p>
        </div>
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>⚠️ ¿Estás seguro?</h2>
            <p>Esta acción eliminará el producto <strong>permanentemente</strong>.</p>
            <p className="modal-sub">No se puede deshacer.</p>
            <div className="modal-actions">
              <button className="btn-confirm-delete" onClick={deleteProduct}>
                ✅ Sí, eliminar
              </button>
              <button className="btn-cancel-delete" onClick={() => {
                setShowConfirmModal(false);
                setProductToDelete(null);
              }}>
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;