
const { v4 } = require('uuid');

class Database {

  constructor() {
    this.tickets = [];
  }

  addNewTicket(body) {
    const { name, description, status } = body;
    const id = v4();
    const created = new Date().toISOString();
    const newTicket = {id, name, description, status, created};
    this.tickets.push(newTicket);
    return newTicket;
  }

  allTickets() {
    return this.tickets;
  }

  getTicketById(id) {
      return this.tickets.find((ticket) => id === ticket.id);
  }

  deleteTicketById(id) {
      const indexToDelete = this.tickets.findIndex((ticket) => ticket.id === id);

      if (indexToDelete === -1) {
        return undefined;
      }

      return this.tickets.splice(indexToDelete, 1)[0];
  }

  editTicketById(body, id) {
      const { name, description, status } = body;
      const indexToEdit = this.tickets.findIndex((ticket) => ticket.id === id);

      if (indexToEdit === -1) {
        return undefined;
      }

      const ticket = this.tickets[indexToEdit];
      ticket.name = name;
      ticket.description = description;
      ticket.status = status;

      return ticket;
  }
}



module.exports = Database;