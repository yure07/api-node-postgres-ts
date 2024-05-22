import fastify from "fastify";
import { FastifyInstance, FastifyRequest } from 'fastify';
//import DataBaseMomory from "./database-memory";
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
//const data = new DataBaseMomory()
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

server.listen({ port: 3333 }, () => {
  console.log('servidor na porta 3333!')
})