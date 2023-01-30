import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketPayment, postPayment } from '@/controllers';

const paymentsRouters = Router();

paymentsRouters.all('/*', authenticateToken).get('/', getTicketPayment).post('/process', postPayment);

export { paymentsRouters };
