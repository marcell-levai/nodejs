import { findAll, findProductById } from '../../data/repositories/product.repository';
import { RequestHandler } from 'express';

export const getAll: RequestHandler = async (req, res) => {  
  try{
    const products = await findAll();  
    return res.status(200).json({ data:{ products }, error: null });
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
}

export const getById: RequestHandler = async (req, res) => {
  const { productId } = req.params;

  try{
    const product = await findProductById(productId);

    if(!product){
      return res.status(404).json({ data: null, message: 'No product with such id' });
    }else{
      return res.status(200).json({ data:{ product }, error: null });
    }  
  }catch(error){
    console.error('Internal Server error:', error);
    return res.status(500).json({ data: null, error: { message: 'Internal Server error' } });
  }
}