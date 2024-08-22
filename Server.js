const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const koaCors = require('koa-cors');
const Database = require('./database');

const database = new Database();
const app = new Koa();
const server = http.createServer(app.callback());
const port = 7070;

app.use (koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx, next) => {

  ctx.response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ['DELETE', 'PUT', 'PATCH'],
  });

  const { method, id } = ctx.request.query;
  const { method: httpMethod, body } = ctx.request;

  let ticket;

  try {
    switch (method) {
      case 'allTickets':
        ctx.response.body = database.allTickets();
        return;

      case 'ticketById':
        ctx.response.body = { ticket: database.getTicketById(id) };
        return;

      case 'deleteTicketById':
        ticket = database.deleteTicketById(id);
        ctx.response.body = { ticket };
        return;

      case 'createTicket':
        ticket = database.addNewTicket(body);
        ctx.response.body = { ticket };
        return;

      case 'editTicket':
        ticket = database.editTicketById(body, id);
        ctx.response.body = { ticket };
        return;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
})



server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`server is worked at ` + port );
});

 

