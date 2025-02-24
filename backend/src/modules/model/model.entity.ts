import { Entity, PrimaryKey, Property, Enum, Collection, OneToMany } from "@mikro-orm/core";
import { AppliesPricing } from "../applies_pricing/applies_pricing.entity.js"

export enum EnumPlatform {
    SMS = "SMS",
    WHATSAPP = "WHATSAPP",
    TELEGRAM = "TELEGRAM",
  }
  
@Entity()
export class Model {
    @PrimaryKey({ autoincrement: true })
    id!: number;
  
    @Property({ nullable: true })
    pseudo!: string;
  
    @Enum(() => EnumPlatform)
    platform!: EnumPlatform;
  
    @Property()
    profile_link!: string;
  
    @Property()
    cup!: string;

    @Property()
    public_state!: string;

    @Property()
    nationality!: string;

    @Property()
    ethnicity!: string;
  
    @Property()
    languages!: string;

    @Property()
    contact_method!: string;

    @Property()
    base_city!: string;

    @Property()
    contact_info!: string;
  
    @Property()
    work_location!: string;
  
    @OneToMany(() => AppliesPricing, appliesPricing => appliesPricing.model)
    pricing ?= new Collection<AppliesPricing>(this);
}