import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/product.routes';
import cartsRoutes from './routes/cart.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mongoose from 'mongoose';
import { AuthMiddleware } from './middlewares/auth.middleware';
const swaggerDocument = YAML.load('./src/utils/swagger.yaml');

const PORT = process.env.PORT || 4000;
const app : Express = express();

const mongoUrl = 'mongodb://localhost:27017';

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const authMiddleware = new AuthMiddleware();
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware.verifyToken, productsRoutes);
app.use('/api/profile/cart', authMiddleware.verifyToken, cartsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));