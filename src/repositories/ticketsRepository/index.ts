import { prisma } from "@/config";
import { Ticket, TicketStatus} from "@prisma/client";


async function findTypesTickets() {
  return prisma.ticketType.findMany()
}

async function findIdTicket(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
           id: ticketId
        },
        include: {
            Enrollment:true
        }
    })
}

async function findTicketTypeId(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
           id: ticketId
        },
        include: {
            TicketType:true
        }
    })
}




async function findTicketId(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId
        },

        include: {
            TicketType: true
        }
    })
}

async function postTicket(ticket: ticketType) {
    return prisma.ticket.create({
        data: {
            ...ticket
        }
    })
}

async function processTicket(ticketId: number) {
    return prisma.ticket.update({
        where: {
            id: ticketId,
        },
        data: {
            status: TicketStatus.PAID
        }
    })
}

export type ticketType = Omit<Ticket, "id" | "updatedAt" | "createdAt">


const ticketsRepository = {
    findTypesTickets,
    findTicketId,
    postTicket,
    findIdTicket,
    findTicketTypeId,
    processTicket
  
};

export default ticketsRepository;
