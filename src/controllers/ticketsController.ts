import { AuthenticatedRequest } from '@/middlewares';
import tickesService from '@/services/ticketsService';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTypesTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const typeTickets = await tickesService.getTypesTickets();

    return res.status(httpStatus.OK).send(typeTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  if(!ticketTypeId) {
    return res.sendStatus(400)
  }
  try {
    const typeTickets = await tickesService.postTickets(userId, ticketTypeId);

    return res.status(201).send(typeTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const typeTickets = await tickesService.getTicketId(userId);

    return res.status(httpStatus.OK).send(typeTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
