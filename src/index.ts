/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/product.routes';
import cartsRoutes from './routes/cart.routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mongoose from 'mongoose';
const swaggerDocument = YAML.load('./src/utils/swagger.yaml');
import { MONGO_URL, PORT} from '../config';
import { requestLogger } from './logger';
import { Socket } from 'net';

const app : Express = express();
mongoose.connect(MONGO_URL)
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
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/profile/cart', cartsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => {
  checkDBConnection((error) => {
    if (error) {
      res.status(500).json({
        message: 'Application is unhealthy - Database connection failed',
      });
    } else {
      res.status(200).json({
        message: 'Application is healthy',
      });
    }
  });
});

app.use(requestLogger);

const server = app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
let connections: any = [];

server.on('connection', (connection) => {
  connections.push(connection);

  connection.on('close', () => {
    connections = connections.filter((currentConnection: Socket) => currentConnection !== connection);
  });
});

function checkDBConnection(callback:(error: Error | null) => void) {
  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    callback(null);
  } else {
    callback(new Error('Database connection failed'));
  }
}

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 20000);

  connections.forEach((connection: { end: () => any; }) => connection.end());

  setTimeout(() => {
    connections.forEach((connection: { destroy: () => any; }) => connection.destroy());
  }, 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
