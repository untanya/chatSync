import { EntityMetadata, EntityProperty, FilterQuery, SqlEntityRepository } from "@mikro-orm/mysql";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Conversation } from "../modules/conversation/conversation.entity.js";
import { Message } from "../modules/message/message.entity.js";
import { Model } from "../modules/model/model.entity.js";
import { Pricing } from "../modules/pricing/pricing.entity.js";
import { ServicesCatalog } from "../modules/service_catalog/service_catalog.entity.js";
import { User } from "../modules/user/user.entity.js";
import { formatDateForMySQL, getRequiredFields } from "../utils/general.js";
import { initORM } from "../config/db.js";


/**
 * Fonction générique pour récupérer une entité par ID
 */
export async function getEntity<T extends { id: number }>(
    req: Request<{ id: string }>,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string
  ): Promise<any> {
    try {
        const entityId = parseInt(req.params.id, 10);
    
        if (isNaN(entityId)) {
            return res.status(400).json({ error: `ID ${entityName} invalide` });
        }

        const entity = await repo.findOne({ id: entityId } as FilterQuery<T>);
    
        if (!entity) {
            return res.status(404).json({ error: `${entityName} non trouvé` });
        }
    
        return res.json(entity);
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération de ${entityName} :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/**
 * Fonction générique pour récupérer toutes les entités
 */
export async function getAllEntities<T extends object>(
    req: Request,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string
  ): Promise<any> {
    try {
        const entities = await repo.findAll();
        return res.json(entities);
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération des ${entityName}s :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
/**
 * Fonction générique pour créer une entité
 */
export async function createEntity<T extends object>(
    req: Request,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string
    ): Promise<any> {
    try {

        const requiredFields = await getRequiredFields(repo);
        const missingFields = requiredFields.filter(field => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Champs obligatoires manquants: ${missingFields.join(", ")}` });
        }

        let entityData = req.body;
        let entity;
        let em;

        if (req.body.created_at) {
            req.body.created_at = formatDateForMySQL(req.body.created_at);
        }
        if (req.body.read_at) {
            req.body.read_at = formatDateForMySQL(req.body.read_at);
        }

        if (entityName === "Conversation") {
            entityData = await handleConversationData(req);

            em = repo.getEntityManager();
            entity = repo.create(entityData);
        } else {
            em = repo.getEntityManager();
            entity = repo.create(req.body);
        }
        
        await em.persistAndFlush(entity);
        return res.status(201).json(entity);
    } catch (error) {
        console.error(`❌ Erreur lors de la création de ${entityName} :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateEntity<T extends { id: number }>(
    req: Request<{ id: string }>,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string)
    : Promise<any> {
    try {
        const { id } = req.params;
        const entityId = parseInt(id, 10);
    
        if (isNaN(entityId)) {
            return res.status(400).json({ error: `ID ${entityName} invalide` });
        }
    
        const entity = await repo.findOne(entityId as FilterQuery<T>) ;
        if (!entity) {
            return res.status(404).json({ error: `Aucune entrée ${entityName}<${entityId}> trouvé !` });
        }

        if (req.body.created_at) {
            req.body.created_at = formatDateForMySQL(req.body.created_at);
        }
        if (req.body.read_at) {
            req.body.read_at = formatDateForMySQL(req.body.read_at);
        }

        let updatedData = req.body;
        if (entityName === "Conversation") {
            updatedData = await handleConversationData(req);

            Object.assign(entity, updatedData);
        } else {
            Object.keys(req.body).forEach((key) => {
                (entity as any)[key] = req.body[key];
            });
        }
    
        await repo.getEntityManager().persistAndFlush(entity);
        return res.json(entity);
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour de ${entityName} :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
  
export async function patchEntity<T extends { id: number }>(
    req: Request<{ id: string }>,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string)
    : Promise<any> {
    try {
        const { id } = req.params;
        const entityId = parseInt(id, 10);

        if (isNaN(entityId)) {
            return res.status(400).json({ error: `ID ${entityName} invalide` });
        }

        const entity = await repo.findOne(entityId as FilterQuery<T>);
        if (!entity) {
            return res.status(404).json({ error: `${entityName} non trouvé` });
        }

        if (req.body.created_at) {
            req.body.created_at = formatDateForMySQL(req.body.created_at);
        }
        if (req.body.read_at) {
            req.body.read_at = formatDateForMySQL(req.body.read_at);
        }

        for (const key of Object.keys(req.body)) {
            if (req.body[key] !== undefined) {
                (entity as any)[key] = req.body[key];
            }
        }

        await repo.getEntityManager().persistAndFlush(entity);
        return res.json(entity);
    } catch (error) {
        console.error(`❌ Erreur lors de la mise à jour partielle de ${entityName} :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

/**
 * Fonction générique pour supprimer une entité par ID
 */
export async function deleteEntity<T extends { id: number }>(
    req: Request<{ id: string }>,
    res: Response,
    repo: SqlEntityRepository<T>,
    entityName: string
  ): Promise<any> {
    try {
        const entityId = parseInt(req.params.id, 10);
    
        if (isNaN(entityId)) {
            return res.status(400).json({ error: `ID ${entityName} invalide` });
        }

        if (entityName === "Conversation") {
            // Supprimer les messages liés à la conversation
            const em = repo.getEntityManager();
            await em.nativeDelete(Message, { conversation: entityId });
        }
    
        const entity = await repo.findOne({ id: entityId } as FilterQuery<T>);
        if (!entity) {
            return res.status(404).json({ error: `${entityName} non trouvé` });
        }
    
        await repo.getEntityManager().removeAndFlush(entity);
        return res.json({ message: `${entityName} supprimé avec succès` });
    } catch (error) {
        console.error(`❌ Erreur lors de la suppression de ${entityName} :`, error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleConversationData(req: Request) {
    const { em, userRepo, modelRepo } = await initORM();
    const { from, to } = req.body;

    const fromUser = await userRepo.findOne(from);
    const fromModel = await modelRepo.findOne(from);
    const toUser = await userRepo.findOne(to);
    const toModel = await modelRepo.findOne(to);

    if (!fromUser && !fromModel) {
        throw new Error("Expéditeur invalide");
    }
    if (!toUser && !toModel) {
        throw new Error("Destinataire invalide");
    }

    return {
        fromUser: fromUser ?? undefined,
        fromModel: fromModel ?? undefined,
        toUser: toUser ?? undefined,
        toModel: toModel ?? undefined,
    };
}