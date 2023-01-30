import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTypesTickets, getTickets, postTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTypesTickets)
  .get("", getTickets)
  .post("", postTickets)



export { ticketsRouter };
