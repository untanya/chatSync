import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

   @PrimaryKey({ autoincrement: true, nullable: false })
   id!: number;

   @Property({ nullable: false })
   pseudo!: string;
   

   @Property({ nullable: false })
   contact_info!: string;

   @Property({ nullable: false })
   base_city!: string;

   @Property({ nullable: false })
   token!: string;
}