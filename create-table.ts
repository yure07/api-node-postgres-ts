import { sql } from "./sql";

sql`
  CREATE TABLE cars (
    id TEXT PRIMARY KEY,
    name TEXT,
    year INTEGER,
    price INTEGER
  )
`
  .then(() => {
    console.log('a tabela foi criada!')
  })
  .catch((err) => {
    console.log('erro ao criar tabela:' + err)
  })