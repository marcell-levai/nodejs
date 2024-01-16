import { ProductService } from "../../business/services/product.service";
import { RequestHandler } from "express";


export class ProductController {
    private productService: ProductService;

    constructor(){
        this.productService = new ProductService();
    }

    getAllProduct: RequestHandler = (req, res) => {
        try{
            const products = this.productService.getAllProduct();
            return res.status(200).json({ data: products, error: null} );
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }

    getProductById: RequestHandler = (req, res) => {
        try{
            const { productId } = req.params;
            const product = this.productService.getProductById(productId);
            return res.status(200).json({ data: product, error: null});
        }catch(error){
            return res.status(error.status || 500).json({ data: null, error: { message: error.message || 'Internal Server Error' }});
        }
    }
}