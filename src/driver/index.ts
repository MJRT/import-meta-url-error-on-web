import { electrify } from "electric-sql/expo-next";
import type { ElectricClient } from "electric-sql/expo-next";
import * as SQLite from "expo-sqlite/next";

import { config } from "./config";
import { schema } from "../generated/client";

let client: ElectricClient;

const init = async () => {
  const conn = SQLite.openDatabaseSync("electric.db");

  const client = await electrify(conn, schema, config);

  return client;
};

export const db = async () => {
  if (!client) {
    client = await init();
  }
  return client.db;
};
