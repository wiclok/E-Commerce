import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/user.routes.js';
import ProductRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import saleRouter from './routes/sale.routes.js';
import { PORT } from '../src/config/environments.js';
import { startDB } from './db/startDB.js';

class Server {

  constructor () {
    this.app = express();
    this.port = PORT;

    this.db_Connection();

    this.middleware();

    this.routes();
    
  }

  async db_Connection(){
    await startDB()
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('dev'))
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/api/users', userRouter);
    this.app.use('/api/products', ProductRouter);
    this.app.use('/api/carts', cartRouter);
    this.app.use('/api/sales', saleRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

}

export default Server;