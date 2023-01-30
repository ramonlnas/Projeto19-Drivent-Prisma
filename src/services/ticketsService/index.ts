import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticketsRepository";
import { not } from "joi";
import { TicketStatus } from "@prisma/client";



async function getTypesTickets() {

  const typeTickets = await ticketRepository.findTypesTickets()

    if(!typeTickets) {
        throw notFoundError()
    }

    return typeTickets
}

async function getTicketId(userId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId)

    if(!enroll) {
        throw notFoundError()
    }

    const ticket = await ticketRepository.findTicketId(enroll.id)

    if(!ticket) {
        throw notFoundError()
    }

    return ticket
}

async function postTickets(userId: number, ticketTypeId: number) {
    const enroll = await enrollmentRepository.findWithAddressByUserId(userId)

    if(!enroll) {
        throw notFoundError()
    }

    const typeTicket = {
        enrollmentId: enroll.id,
        ticketTypeId,
        status: TicketStatus.RESERVED
    }


    await ticketRepository.postTicket(typeTicket)

    const ticket = ticketRepository.findTicketId(enroll.id)

    return ticket
}


const ticketsService = {
    getTypesTickets,
    getTicketId,
    postTickets
};

export default ticketsService;
