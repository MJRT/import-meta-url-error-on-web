import { PGlite } from "@electric-sql/pglite";
import { electrify } from "electric-sql/pglite";

import { config } from "./config";
import { schema } from "../generated/client";

const init = async () => {
  const conn = new PGlite("idb://notes.db", {
    relaxedDurability: true,
  });

  const client = await electrify(conn, schema, config);

  return client;
};

export const client = await init();
export const db = client.db;
