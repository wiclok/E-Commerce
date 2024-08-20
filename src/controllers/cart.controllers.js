import cartService from "../service/cart.service.js";
import productService from "../service/product.service.js";
import userService from "../service/user.service.js";

class CartController {

  constructor() { }

  async addProductToCart(req, res) {
    const { idUser, idProduct } = req.params;
    const { quantity } = req.body

    const user = await userService.getUserById(idUser);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (user.role !== 'client') {
      return res.status(403).json({ message: 'Solo los clientes pueden agregar productos al carrito'})
    }
    
    const product = await productService.getProductById(idProduct);
    if (!product) return res.status(404).send({ message: 'Producto no encontrado' });

    const newProduct = await cartService.addProductToCart(idUser, idProduct, quantity);

    if (!newProduct) {
      return res.status(404).send({
          status: 404,
          message: 'No se ha podido agregar el producto al carrito!'
      })
    }

    res.status(201).send( { message: newProduct })

  }

  async getCartById(req, res) {
    const { idUser } = req.params;

    const user = userService.getUserById(idUser);
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado' });

    const cart = await cartService.getCartById(idUser);
    if (!cart) return res.status(404).send({ message: 'Carrito no encontrado' });
    
    res.status(200).send({ message: cart})
  }

  async deleteProductFromCart(req, res) {
    try {
      const { idUser, idProduct } = req.params;
    
      const user = userService.getUserById(idUser);
      if(!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      if (!user.role === 'client') return res.status(403).json({ message: 'Solo los clientes pueden eliminar productos del carrito'})
    
      const product = await productService.getProductById(idProduct);
  
      if(!product) return res.status(404).json({ message: 'Producto no encontrado' })
  
      await cartService.deleteProductFromCart(idUser, idProduct);
      res.status(200).json({ message: 'Producto eliminado del carrito' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error al eliminar el producto del carrito' })
    }
  }

}

export default new CartController()