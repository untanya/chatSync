import { Migration } from '@mikro-orm/migrations';

export class Migration20250222130901 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`model\` (\`id\` int unsigned not null auto_increment primary key, \`pseudo\` varchar(255) null, \`platform\` enum('SMS', 'WHATSAPP', 'TELEGRAM') not null, \`profile_link\` varchar(255) not null, \`cup\` varchar(255) not null, \`public_state\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`pricing\` (\`id\` int unsigned not null auto_increment primary key, \`duration\` int not null, \`rate\` int not null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`applies_pricing\` (\`id\` int unsigned not null auto_increment primary key, \`model_id\` int unsigned not null, \`pricing_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`applies_pricing\` add index \`applies_pricing_model_id_index\`(\`model_id\`);`);
    this.addSql(`alter table \`applies_pricing\` add index \`applies_pricing_pricing_id_index\`(\`pricing_id\`);`);

    this.addSql(`create table \`services_catalog\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`service_rate\` int not null, \`pricing_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`services_catalog\` add index \`services_catalog_pricing_id_index\`(\`pricing_id\`);`);

    this.addSql(`create table \`conversation\` (\`id\` int unsigned not null auto_increment primary key, \`from_id\` int unsigned not null, \`to_id\` int unsigned not null, \`model_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`conversation\` add index \`conversation_from_id_index\`(\`from_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_to_id_index\`(\`to_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_model_id_index\`(\`model_id\`);`);

    this.addSql(`create table \`message\` (\`id\` int unsigned not null auto_increment primary key, \`content\` varchar(255) not null, \`created_at\` datetime not null, \`read_at\` datetime null, \`status\` enum('sent', 'delivered', 'read', 'failed') not null, \`external_id\` varchar(255) null, \`conversation_id\` int unsigned not null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`message\` add unique \`message_external_id_unique\`(\`external_id\`);`);
    this.addSql(`alter table \`message\` add index \`message_conversation_id_index\`(\`conversation_id\`);`);

    this.addSql(`alter table \`applies_pricing\` add constraint \`applies_pricing_model_id_foreign\` foreign key (\`model_id\`) references \`model\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`applies_pricing\` add constraint \`applies_pricing_pricing_id_foreign\` foreign key (\`pricing_id\`) references \`pricing\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`services_catalog\` add constraint \`services_catalog_pricing_id_foreign\` foreign key (\`pricing_id\`) references \`pricing\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`conversation\` add constraint \`conversation_from_id_foreign\` foreign key (\`from_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_to_id_foreign\` foreign key (\`to_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_model_id_foreign\` foreign key (\`model_id\`) references \`model\` (\`id\`) on update cascade;`);

    this.addSql(`alter table \`message\` add constraint \`message_conversation_id_foreign\` foreign key (\`conversation_id\`) references \`conversation\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`applies_pricing\` drop foreign key \`applies_pricing_model_id_foreign\`;`);

    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_model_id_foreign\`;`);

    this.addSql(`alter table \`applies_pricing\` drop foreign key \`applies_pricing_pricing_id_foreign\`;`);

    this.addSql(`alter table \`services_catalog\` drop foreign key \`services_catalog_pricing_id_foreign\`;`);

    this.addSql(`alter table \`message\` drop foreign key \`message_conversation_id_foreign\`;`);

    this.addSql(`drop table if exists \`model\`;`);

    this.addSql(`drop table if exists \`pricing\`;`);

    this.addSql(`drop table if exists \`applies_pricing\`;`);

    this.addSql(`drop table if exists \`services_catalog\`;`);

    this.addSql(`drop table if exists \`conversation\`;`);

    this.addSql(`drop table if exists \`message\`;`);
  }

}
