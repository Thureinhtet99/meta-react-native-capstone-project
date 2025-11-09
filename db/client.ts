import * as SQLITE from "expo-sqlite";

const db = SQLITE.openDatabaseAsync("little_lemon");

export default db;
