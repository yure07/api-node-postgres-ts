import { randomUUID } from "crypto";

interface CarObj{
  id?: string,
  name: string,
  year: number,
  price: number
}


class DataBaseMomory{
  #cars:Map<string, CarObj> = new Map()

  get(search?:string){
    if(search){
      return Array.from(this.#cars.values())
        .filter((car) => {
          if(car.name.includes(search)) {
            return true
          }
          return false
        })
    } else return Array.from(this.#cars.values())
  }

  async post(car: CarObj){
    const carId: string = randomUUID()
    const { name, year, price } = car
    /* this.#cars.set(carId, {
      id: carId,
      name,
      year,
      price
    }) */
    
  }

  put(carId:string, newCar:CarObj){
    Array.from(this.#cars.values())
      .map((car) => {
        if(car.id === carId) {
          car.name = newCar.name
          car.year = newCar.year
          car.price = newCar.price
        }
      })
  }

  delete(carId: string){
    this.#cars.delete(carId)
  }
}

export default DataBaseMomory