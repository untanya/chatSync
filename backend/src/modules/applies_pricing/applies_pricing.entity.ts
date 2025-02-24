import { Entity, ManyToOne, PrimaryKey } from "@mikro-orm/core";
import { Pricing } from "../pricing/pricing.entity.js"; 
import { Model } from "../model/model.entity.js"; 

@Entity()
export class AppliesPricing {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Model)
  model!: Model;

  @ManyToOne(() => Pricing)
  pricing!: Pricing;
}