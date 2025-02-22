import { Entity, PrimaryKey, ManyToOne, OneToMany, Collection, Ref } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { Model } from "../model/model.entity.js";
import { Message } from "../message/message.entity.js";

@Entity()
export class Conversation {
  @PrimaryKey({ autoincrement: true, nullable: false })
  id!: number;

  @ManyToOne(() => User, { nullable: true })
  fromUser?: Ref<User>;

  @ManyToOne(() => Model, { nullable: true })
  fromModel?: Ref<Model>;

  @ManyToOne(() => User, { nullable: true })
  toUser?: Ref<User>;

  @ManyToOne(() => Model, { nullable: true })
  toModel?: Ref<Model>;

  @OneToMany(() => Message, (message) => message.conversation)
  messages = new Collection<Message>(this);
}
