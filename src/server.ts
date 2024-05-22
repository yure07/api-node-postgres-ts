import fastify from "fastify";
import { FastifyInstance, FastifyRequest } from 'fastify';
import DataBaseNeon from "./database-neondb";

interface CarObj{
  name: string,
  year: number,
  price: number
}

interface ParamsType{
  id: string,
  search: string
}

const server = fastify()
const host = '0.0.0.0'
const port = Number(process.env.PORT) ?? 3333
const data = new DataBaseNeon()

server.get('/cars', async (request: FastifyRequest<{ Querystring: ParamsType }>, reply) => {
  const search = request.query.search
  const cars = await data.get(search)
  return reply.status(200).send(cars)
})


server.post('/cars', async (request, reply) => {
  const { name, year, price } = request.body as CarObj
  await data.post({
    name,
    year,
    price
  })

  return reply.status(201).send(request.body)
})

server.put('/cars/:id', (request: FastifyRequest<{ Params: ParamsType }>, reply) => {
  const idCar = request.params.id
  const { name, year, price } = request.body as CarObj

  data.put(idCar, {
    name,
    year,
    price
  })

  return reply.status(201).send(request.body)
})

server.delete('/cars/:id', (request: FastifyRequest<{ Params: ParamsType }>, reply) => {
  const idCar = request.params.id

  data.delete(idCar)

  return reply.status(200).send()
})

async function startServer() {
  try {
    await server.listen({ port, host })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
startServer()