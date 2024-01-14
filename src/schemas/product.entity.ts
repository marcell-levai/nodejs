import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface ProductEntity {
    title: string;
    description: string;
    price: number;
}

const ProductSchema: Schema = new Schema({
    _id: { type: String, default: uuidv4, alias: 'id' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false }
);
  
const ProductModel = mongoose.model<ProductEntity>('Product', ProductSchema);
export default ProductModel;