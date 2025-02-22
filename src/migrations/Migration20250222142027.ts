import { Migration } from '@mikro-orm/migrations';

export class Migration20250222142027 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_from_id_foreign\`;`);
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_to_id_foreign\`;`);
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_model_id_foreign\`;`);

    this.addSql(`alter table \`conversation\` drop index \`conversation_from_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop index \`conversation_to_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop index \`conversation_model_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop column \`from_id\`, drop column \`to_id\`, drop column \`model_id\`;`);

    this.addSql(`alter table \`conversation\` add \`from_user_id\` int unsigned null, add \`from_model_id\` int unsigned null, add \`to_user_id\` int unsigned null, add \`to_model_id\` int unsigned null;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_from_user_id_foreign\` foreign key (\`from_user_id\`) references \`user\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_from_model_id_foreign\` foreign key (\`from_model_id\`) references \`model\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_to_user_id_foreign\` foreign key (\`to_user_id\`) references \`user\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_to_model_id_foreign\` foreign key (\`to_model_id\`) references \`model\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`conversation\` add index \`conversation_from_user_id_index\`(\`from_user_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_from_model_id_index\`(\`from_model_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_to_user_id_index\`(\`to_user_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_to_model_id_index\`(\`to_model_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_from_user_id_foreign\`;`);
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_from_model_id_foreign\`;`);
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_to_user_id_foreign\`;`);
    this.addSql(`alter table \`conversation\` drop foreign key \`conversation_to_model_id_foreign\`;`);

    this.addSql(`alter table \`conversation\` drop index \`conversation_from_user_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop index \`conversation_from_model_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop index \`conversation_to_user_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop index \`conversation_to_model_id_index\`;`);
    this.addSql(`alter table \`conversation\` drop column \`from_user_id\`, drop column \`from_model_id\`, drop column \`to_user_id\`, drop column \`to_model_id\`;`);

    this.addSql(`alter table \`conversation\` add \`from_id\` int unsigned not null, add \`to_id\` int unsigned not null, add \`model_id\` int unsigned not null;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_from_id_foreign\` foreign key (\`from_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_to_id_foreign\` foreign key (\`to_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`conversation\` add constraint \`conversation_model_id_foreign\` foreign key (\`model_id\`) references \`model\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`conversation\` add index \`conversation_from_id_index\`(\`from_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_to_id_index\`(\`to_id\`);`);
    this.addSql(`alter table \`conversation\` add index \`conversation_model_id_index\`(\`model_id\`);`);
  }

}
