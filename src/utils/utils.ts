import { initORM } from "../config/db.js";
import { TestSeeder } from "../seeders/TestSeeder.js";

const { orm } = await initORM()

await orm.schema.updateSchema();
await orm.seeder.seed(TestSeeder);