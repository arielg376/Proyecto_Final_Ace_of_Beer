// ANTES
const { cart, getTotalPrice, clearCart } = useCart();

// AHORA (con un key para forzar render)
const { cart, getTotalPrice, clearCart, getTotalItems } = useCart();
const [renderKey, setRenderKey] = useState(0);

// Cuando cambia el carrito, forzar render
useEffect(() => {
  setRenderKey(prev => prev + 1);
}, [cart]);