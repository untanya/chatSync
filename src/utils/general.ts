import {EntityMetadata, EntityProperty, SqlEntityRepository } from "@mikro-orm/mysql";
import { DateTime } from "luxon"

/**
 * Fonction pour récupérer dynamiquement les champs obligatoires d'une entité avec MikroORM
 */
export async function getRequiredFields<T extends object>(repo: SqlEntityRepository<T>): Promise<string[]> {
    const em = repo.getEntityManager(); // ✅ Obtenir l'EntityManager
    
    // 🔥 Récupération du nom de l'entité à partir du repository
    const entityName = repo.getEntityName(); // Exemple: "UserRepository" → "User"

    const metadata: EntityMetadata | undefined = em.getMetadata().get(entityName);

    if (!metadata) {
        throw new Error(`Impossible de récupérer les métadonnées de l'entité ${entityName}.`);
    }

    return Object.keys(metadata.properties).filter((key) => {
        const prop: EntityProperty = metadata.properties[key];
        return !prop.nullable && !prop.primary; // 🔥 Exclure les clés primaires et champs optionnels
    });
}

export function formatDateForMySQL(dateString: string): string {
    return DateTime.fromISO(dateString).toFormat('yyyy-MM-dd HH:mm:ss');
}