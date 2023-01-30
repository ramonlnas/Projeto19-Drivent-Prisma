import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function findIdPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, params: PayParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

  
export type PayParams = Omit<Payment,  "createdAt" | "updatedAt" | "id">

const paymentyRepository = {
  findIdPayment,
  createPayment
};

export default paymentyRepository;
