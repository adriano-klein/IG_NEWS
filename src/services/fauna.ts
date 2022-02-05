import { Client } from "Faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
