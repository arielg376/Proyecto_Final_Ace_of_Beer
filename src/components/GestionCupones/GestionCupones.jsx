import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import "./GestionCupones.css";

const estadoInicial = {
    codigo: "",
    descuento: ""
};

const GestionCupones = () => {

    const [datosForm, setDatosForm] = useState(estadoInicial);
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const obtenerCupones = async () => {
        try {
            setLoading(true);
            const respuesta = await getDocs(collection(db, "cupones"));
            const lista = respuesta.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCupones(lista);
        } catch (error) {
            console.error("Error al obtener cupones:", error);
            alert("Error al cargar los cupones.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerCupones();
    }, []);

    
    const manejarCambio = (e) => {
        setDatosForm({
            ...datosForm,
            [e.target.name]: e.target.value
        });
    };

    
    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (!datosForm.codigo || !datosForm.descuento) {
            alert("Complete todos los campos");
            return;
        }

        const descuentoNum = Number(datosForm.descuento);
        if (descuentoNum < 1 || descuentoNum > 100) {
            alert("El descuento debe estar entre 1 y 100");
            return;
        }

        try {
            setLoading(true);

            if (cuponAEditar) {
                // Editar cupón
                await updateDoc(
                    doc(db, "cupones", cuponAEditar.id),
                    {
                        codigo: datosForm.codigo.toUpperCase().trim(),
                        descuento: descuentoNum
                    }
                );
                alert("✅ Cupón actualizado con éxito");
            } else {
                // Crear cupón
                await addDoc(collection(db, "cupones"), {
                    codigo: datosForm.codigo.toUpperCase().trim(),
                    descuento: descuentoNum
                });
                alert("✅ Cupón creado con éxito");
            }

            setDatosForm(estadoInicial);
            setCuponAEditar(null);
            obtenerCupones();

        } catch (error) {
            console.error("Error al guardar cupón:", error);
            alert("Error al guardar el cupón.");
        } finally {
            setLoading(false);
        }
    };

    
    const editarCupon = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo,
            descuento: cupon.descuento
        });
    };

    
    const eliminarCupon = async (id) => {
        if (!window.confirm("¿Eliminar este cupón?")) return;

        try {
            setLoading(true);
            await deleteDoc(doc(db, "cupones", id));

            if (cuponAEditar?.id === id) {
                setCuponAEditar(null);
                setDatosForm(estadoInicial);
            }

            obtenerCupones();
            alert("✅ Cupón eliminado con éxito");
        } catch (error) {
            console.error("Error al eliminar cupón:", error);
            alert("Error al eliminar el cupón.");
        } finally {
            setLoading(false);
        }
    };

    
    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm(estadoInicial);
    };

    return (
        <div className="gestion-cupones-container">
            <h1>🎫 Gestión de Cupones</h1>
            <p className="subtitle">Creá y administrá cupones de descuento</p>

            <form className="cupon-form" onSubmit={manejarEnvio}>
                <h2>{cuponAEditar ? "✏️ Editar Cupón" : "➕ Crear Nuevo Cupón"}</h2>

                <div className="form-grid">
                    <input
                        type="text"
                        name="codigo"
                        placeholder="Código del cupón (ej: VERANO10)"
                        value={datosForm.codigo}
                        onChange={manejarCambio}
                        required
                    />
                    <input
                        type="number"
                        name="descuento"
                        placeholder="Descuento % (ej: 10)"
                        value={datosForm.descuento}
                        onChange={manejarCambio}
                        required
                        min="1"
                        max="100"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? "⏳ Procesando..." : cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
                    </button>
                    {cuponAEditar && (
                        <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
                            ❌ Cancelar
                        </button>
                    )}
                </div>
            </form>

            <hr className="divider" />

            <h3>📋 Listado de Cupones</h3>

            {loading && <p>⏳ Cargando cupones...</p>}

            {!loading && cupones.length === 0 && (
                <p className="empty-message">No hay cupones creados aún.</p>
            )}

            <div className="cupones-grid">
                {cupones.map((cupon) => (
                    <div key={cupon.id} className="cupon-card">
                        <div className="cupon-code">{cupon.codigo}</div>
                        <div className="cupon-discount">{cupon.descuento}% descuento</div>
                        <div className="cupon-actions">
                            <button className="btn-edit" onClick={() => editarCupon(cupon)}>
                                ✏️ Editar
                            </button>
                            <button className="btn-delete" onClick={() => eliminarCupon(cupon.id)}>
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestionCupones;