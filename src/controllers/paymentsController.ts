import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import paymentsService from '@/services/paymentsService';
import { unauthorizedError } from '@/errors';



export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {

  try {
    const ticketId = Number(req.query.ticketId)
    const { userId } = req

    if(!ticketId) {
      res.sendStatus(400)
    }

    const payment = await paymentsService.getPaymentId(userId, ticketId);

    if(!payment) {
      return res.sendStatus(404)
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === unauthorizedError) {
      return res.sendStatus(401)
    }
    return res.sendStatus(404);
  }
}


export async function postPayment(req: AuthenticatedRequest, res: Response) {


  try {
    const { userId } = req
    const {
      ticketId,
	cardData
    } = req.body

    if(!ticketId || !cardData) {
      return res.sendStatus(400)
    }

    const payment = await paymentsService.payment(ticketId, cardData, userId);

    if(!payment) {
      return res.sendStatus(404)
    }

   

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === unauthorizedError) {
      return res.sendStatus(401)
    }
    return res.sendStatus(404);
  }
}


