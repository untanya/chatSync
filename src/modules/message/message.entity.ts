import { DateTimeType, Entity, PrimaryKey, Property, Unique, Enum, ManyToOne } from "@mikro-orm/core";
import { Conversation } from "../conversation/conversation.entity.js";

@Entity()
export class Message {
    @PrimaryKey({ autoincrement: true, nullable: false })
    id!: number;

    @Property( { nullable:false } )
    content!: string;

    @Property({ type: "datetime", defaultRaw: "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @Property({ type: "datetime", nullable: true })
    read_at!: DateTimeType;

    @Enum(() => EnumStatus)
    status!: EnumStatus;

    @Property({ nullable: true })
    @Unique()
    external_id!: string;

    @ManyToOne(() => Conversation)
    conversation!: Conversation;
    
}

export enum EnumStatus {
    SENT = 'sent',
    DELIVERED = 'delivered',
    READ = 'read',
    FAILED = "failed"
}
