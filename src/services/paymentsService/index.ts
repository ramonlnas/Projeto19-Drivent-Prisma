import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository, { PayParams } from '@/repositories/paymentRepository';
import ticketsRepository from '@/repositories/ticketsRepository';

async function verifyTicketEnroll(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findIdTicket(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  const enroll = await enrollmentRepository.findEnrollId(ticket.enrollmentId);

  if (enroll.userId !== userId) {
    throw unauthorizedError();
  }

}


async function getPaymentId(userId: number, ticketId: number) {
  
  await verifyTicketEnroll(ticketId, userId)
  const payment = await paymentRepository.findIdPayment(ticketId);

  if (!payment) {
    throw notFoundError();
  }

  return payment;
}

async function payment(ticketId: number, cardData: Payment, userId: number) {

  await verifyTicketEnroll(ticketId, userId)

  const ticket = await ticketsRepository.findTicketTypeId(ticketId)
  
  const paymentD = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentRepository.createPayment(ticketId, paymentD);
  await ticketsRepository.processTicket(ticketId)
  return payment
}
type Payment = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

const paymentsService = {
  getPaymentId,
  payment,
};

export default paymentsService;
