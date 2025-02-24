import { defineConfig } from '@mikro-orm/mysql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { SeedManager } from '@mikro-orm/seeder';

const config=  defineConfig({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME,
    entities: ['./dist/modules/**/*.js'],
    entitiesTs: ['./src/modules/**/*.ts'],
    clientUrl: "mysql://root@mysqldb:3306/chat_sync",
    debug: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    extensions: [Migrator, EntityGenerator, SeedManager],
});

// Ajoute ces exports pour s'assurer que MikroORM le comprenne
module.exports = config;
export default config;
