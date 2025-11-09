import * as SQLITE from "expo-sqlite";

const db = await SQLITE.openDatabaseAsync("little_lemon");

export default db;
