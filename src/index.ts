import express, { Express } from 'express';
import authRoutes from './presentation/routes/auth.controller';
import productsRoutes from './presentation/routes/product.controller';
import cartsRoutes from './presentation/routes/cart.controller';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
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
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/profile/cart', cartsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));