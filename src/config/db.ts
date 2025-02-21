import type { EntityManager, EntityRepository, Options } from "@mikro-orm/mysql";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config.js"; // 🔥 Importe la config directement
import { User } from "../modules/user/user.entity.js";
import { logger } from "./logger.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  userRepo: EntityRepository<User>;
}

let cache: Services | null = null;

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 secondes

export async function initORM(options?: Options): Promise<{ orm: MikroORM; em: EntityManager; userRepo: EntityRepository<User> }> {
  if (cache) {
    return cache;
  }

  let retries = MAX_RETRIES;
  while (retries > 0) {
    try {
      const orm = await MikroORM.init(options ?? config);
      cache = {
        orm,
        em: orm.em.fork(),
        userRepo: orm.em.getRepository(User),
      };
      logger.info("✅ MikroORM initialisé avec succès !");
      return cache;
    } catch (error) {
      const err = error as Error;
      logger.error(`Échec de connexion à la base de données : ${err.message}`);
      retries--;
      if (retries > 0) {
        logger.warn(`Nouvelle tentative de connexion dans ${RETRY_DELAY / 1000} secondes...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        logger.error("Nombre maximal de tentatives atteint. Impossible de se connecter à la base de données.");
        throw error;
      }
    }
  }
  throw new Error("Impossible d'initialiser MikroORM");
}