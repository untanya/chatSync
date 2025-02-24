import { initORM } from "../config/db";
import { TestSeeder } from "../seeders/TestSeeder";

(async () => {
  const { orm } = await initORM();

  await orm.schema.updateSchema();
  await orm.seeder.seed(TestSeeder);
})();