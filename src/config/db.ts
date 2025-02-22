import type { EntityManager, EntityRepository, Options } from "@mikro-orm/mysql";
import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config.js"; // 🔥 Importe la config directement
import { logger } from "./logger.js";

import { User } from "../modules/user/user.entity.js";
import { Message } from "../modules/message/message.entity.js";
import { Conversation } from "../modules/conversation/conversation.entity.js";
import { Pricing } from "../modules/pricing/pricing.entity.js";
import { AppliesPricing } from "../modules/applies_pricing/applies_pricing.entity.js";
import { ServicesCatalog } from "../modules/service_catalog/service_catalog.entity.js";
import { Model } from "../modules/model/model.entity.js";



export interface Services {
  orm: MikroORM;
  em: EntityManager;
  userRepo: EntityRepository<User>;
  messageRepo: EntityRepository<Message>;
  conversationRepo: EntityRepository<Conversation>;
  appliesPricingRepo: EntityRepository<AppliesPricing>;
  modelRepo: EntityRepository<Model>;
  pricingRepo: EntityRepository<Pricing>;
  serviceCatalog: EntityRepository<ServicesCatalog>;
}

let cache: Services | null = null;

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 secondes

export async function initORM(options?: Options): Promise<Services> {
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
        messageRepo: orm.em.getRepository(Message),
        conversationRepo: orm.em.getRepository(Conversation),
        appliesPricingRepo: orm.em.getRepository(AppliesPricing),
        modelRepo: orm.em.getRepository(Model),
        pricingRepo: orm.em.getRepository(Pricing),
        serviceCatalog: orm.em.getRepository(ServicesCatalog),
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