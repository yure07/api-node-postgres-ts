import { randomUUID } from "crypto";
import { sql } from "./sql";

interface CarObj{
  id?: string,
  name: string,
  year: number,
  price: number
}

class DataBaseNeon{
  async get(search?:string): Promise<CarObj[]>{
    let cars: CarObj[]

    if(search){
      cars = await sql<CarObj[]>`select * from cars where name ilike ${'%' + search + '%'}`
    } else {
      cars = await sql<CarObj[]>`select * from cars`
    } 

    return cars
  }

  async post(car: CarObj){
    const carId = randomUUID()
    const { name, year, price } = car
    await sql`insert into cars (id, name, year, price) VALUES (${carId}, ${name}, ${year}, ${price})`
  }

  async put(carId: string, newCar: CarObj){
    const { name, year, price } = newCar
    await sql`update cars set name = ${name}, year = ${year}, price = ${price} WHERE id = ${carId}`
  }

  async delete(carId: string){
    await sql`delete from cars where id = ${carId}`
  }
}

export default DataBaseNeon