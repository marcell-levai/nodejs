import { UpdateCartItemEntity } from '../../schemas/cart.entity';
import { changeCart, createOrder, findCart, removeCart, validateCartItems } from '../../data/repositories/cart.repository';
import { RequestHandler } from 'express';

export const getCart: RequestHandler = async (req, res) => {
    const userId = req.header('x-user-id');
    
    try{   
      const data = await findCart(userId);
      return res.status(200).json({ data , error: null }); 
    }catch(error){
      console.error('Internal Server error:', error);
      return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
    }
};

export const updateCart: RequestHandler = async (req, res) => {
  const userId = req.header('x-user-id');
  const items: UpdateCartItemEntity[] = req.body;

  try{
    const valid = validateCartItems(items);
    if(!valid){
      return res.status(400).json({ data: null, error: { message: 'Porducts are not valid' } });
    }

    const data = await changeCart(userId, items);
    if(!data){
      return res.status(404).json({ data: null, error: { message: 'Cart was not found' } });
    }

    return res.status(200).json({ data , error: null }); 
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const deleteCart: RequestHandler = async (req, res) => {
  const userId = req.header('x-user-id');
  
  try{
      const success = await removeCart(userId);
      return res.status(200).json({ data: success , error: null }); 
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};

export const checkout: RequestHandler = async (req, res) => {
  const userId = req.header('x-user-id');

  try{
      const order = createOrder(userId);

      if(!order){
        return res.status(200).json({ data: null , error: "Cart is empty" }); 
      }else{
        return res.status(200).json({ data: order , error: null }); 
      }  
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
};