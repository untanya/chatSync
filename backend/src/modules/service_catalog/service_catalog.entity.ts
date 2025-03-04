import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Pricing } from "../pricing/pricing.entity.js";

@Entity()
export class ServicesCatalog {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property()
    name!: string;

    @Property()
    service_rate!: number;

    @ManyToOne(() => Pricing, { nullable: false })
    id_pricing!: Pricing;

    @ManyToOne(() => Pricing, { nullable: true })
    id_pricing_services_extra?: Pricing;
}