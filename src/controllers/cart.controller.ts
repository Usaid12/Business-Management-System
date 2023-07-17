/* eslint-disable no-async-promise-executor */
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { Product } from '@src/entities/product.entity';
import { RouteError } from '@src/other/classes';
import CartService from '@src/services/cart.service';
import ProductService from '@src/services/product.service';
import { getLocals } from '@src/util/locals';
import { withTransaction } from '@src/util/withTransaction';

export const addToCart = withTransaction(async (db, req, res) => {
  const user = getLocals(res.locals, 'user');
  const productService = new ProductService(db);
  const product = await productService.findById(req.body.productId);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesnt exists');
  }
  const cartService = new CartService(db);
  const cartItemWhere = {
    user_id: user.id,
    product_id: product.id,
  };
  let cartItem = await cartService.findItem(cartItemWhere);
  if (!cartItem) {
    cartItem = await cartService.addItem(cartItemWhere);
  } else { 
    cartItem = await cartService.updateItemQuantity(cartItemWhere, cartItem.quantity + 1);
  }
  return {
    data: {
      id: cartItem.id,
      quantity: cartItem.quantity,
      price: product.price,
      subTotal: product.price * cartItem.quantity,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
      deletedAt: cartItem.deletedAt,
      product,
    },
    message: 'Item has been added to the cart successfully',
    statusCode: HttpStatusCodes.CREATED,
  };
});

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  subTotal: number
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
}

export const getCartItems = withTransaction<Array<CartItem>>(async (db, req, res) => {
  const cartService = new CartService(db);
  const productService = new ProductService(db);
  const user = getLocals(res.locals, 'user');
  const cartItems = await cartService.findItems({ user_id: user.id });
  let data: Array<CartItem> = [];
  if (cartItems.length > 0) {
    const cartItemsPromises: Promise<CartItem>[] = cartItems.map((cartItem) => {
      return new Promise(async (resolve, reject) => {
        try {
          const product = await productService.findById(cartItem.productId);
          if (!product) {
            throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exists but is part of your cart');
          } 
          resolve({
            id: cartItem.id,
            quantity: cartItem.quantity,
            price: product.price,
            subTotal: product.price * cartItem.quantity,
            createdAt: cartItem.createdAt,
            updatedAt: cartItem.updatedAt,
            deletedAt: cartItem.deletedAt,
            product,
          } as const);
        } catch (error) {
          reject(error); 
        }
      });
    });
    const cartItemsData = await Promise.all(cartItemsPromises);
    data = cartItemsData;
  }
  return {
    data,
    message: 'Your cart items',
    statusCode: HttpStatusCodes.OK,
  };
});

export const removeFromCart = withTransaction(async (db, req, res) => {
  const cartService = new CartService(db);
  const productService = new ProductService(db);
  const user = getLocals(res.locals, 'user');
  const product = await productService.findById(req.body.productId);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesnt exists');
  }
  const cartItem = await cartService.findItem({ user_id: user.id, product_id: product.id });
  if (!cartItem) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exists in your cart');
  }
  await cartService.deleteItem({ user_id: cartItem.userId, product_id: cartItem.productId });
  return {
    data: null,
    message: 'Item has been removed from cart successfully',
    statusCode: HttpStatusCodes.OK,
  };
});

export const getCartItemsCount = withTransaction(async (db, _req, res) => {
  const user = getLocals(res.locals, 'user');
  const cartService = new CartService(db);
  const itemsCount = await cartService.itemsCount({ user_id: user.id });
  return {
    data: {
      itemsCount,
    },
    message :'Successfully fetched the count of products added to cart.',
    statusCode: HttpStatusCodes.OK,
  };
});

export const updateItem = withTransaction(async (db, req, res) => {
  const cartService = new CartService(db);
  const productService = new ProductService(db);
  const user = getLocals(res.locals, 'user');
  const product = await productService.findById(req.body.productId);
  if (!product) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesnt exists');
  }
  const cartItemWhere = {
    user_id: user.id,
    product_id: product.id,
  };
  let cartItem = await cartService.findItem(cartItemWhere);
  if (!cartItem) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, 'Product doesn\'t exists in your cart');
  }  
  cartItem = await cartService.updateItemQuantity(cartItemWhere, req.body.quantity);
  return {
    data: {
      id: cartItem.id,
      quantity: cartItem.quantity,
      price: product.price,
      subTotal: product.price * cartItem.quantity,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
      deletedAt: cartItem.deletedAt,
      product,
    },
    message: 'Quantity of item has been updated successfully',
    statusCode: HttpStatusCodes.OK,
  };
})