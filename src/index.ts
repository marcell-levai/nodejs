import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { AuthMiddleware } from './middlewares/auth.middleware';

const swaggerDocument = YAML.load('./src/utils/swagger.yaml');

const PORT = process.env.PORT || 4000;
const app : Express = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const authMiddleware = new AuthMiddleware();
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware.authenticateUser, productRoutes);
app.use('/api/profile/cart',authMiddleware.authenticateUser, cartRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));