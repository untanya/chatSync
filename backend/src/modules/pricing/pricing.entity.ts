import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { ServicesCatalog } from "../service_catalog/service_catalog.entity.js"

@Entity()
export class Pricing {
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property()
    duration!: number;

    @Property()
    rate!: number;

    @OneToMany(() => ServicesCatalog, servicesCatalog => servicesCatalog.id_pricing)
    services = new Collection<ServicesCatalog>(this);

    @OneToMany(() => ServicesCatalog, servicesCatalog => servicesCatalog.id_pricing_services_extra)
    extra_services = new Collection<ServicesCatalog>(this);
}