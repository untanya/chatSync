import { Migration } from '@mikro-orm/migrations';

export class Migration20250222222722 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`services_catalog\` drop foreign key \`services_catalog_pricing_id_foreign\`;`);

    this.addSql(`alter table \`services_catalog\` drop index \`services_catalog_pricing_id_index\`;`);

    this.addSql(`alter table \`services_catalog\` add \`id_pricing_services_extra_id\` int unsigned null;`);
    this.addSql(`alter table \`services_catalog\` add constraint \`services_catalog_id_pricing_services_extra_id_foreign\` foreign key (\`id_pricing_services_extra_id\`) references \`pricing\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`services_catalog\` change \`pricing_id\` \`id_pricing_id\` int unsigned not null;`);
    this.addSql(`alter table \`services_catalog\` add constraint \`services_catalog_id_pricing_id_foreign\` foreign key (\`id_pricing_id\`) references \`pricing\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`services_catalog\` add index \`services_catalog_id_pricing_id_index\`(\`id_pricing_id\`);`);
    this.addSql(`alter table \`services_catalog\` add index \`services_catalog_id_pricing_services_extra_id_index\`(\`id_pricing_services_extra_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`services_catalog\` drop foreign key \`services_catalog_id_pricing_id_foreign\`;`);
    this.addSql(`alter table \`services_catalog\` drop foreign key \`services_catalog_id_pricing_services_extra_id_foreign\`;`);

    this.addSql(`alter table \`services_catalog\` drop index \`services_catalog_id_pricing_id_index\`;`);
    this.addSql(`alter table \`services_catalog\` drop index \`services_catalog_id_pricing_services_extra_id_index\`;`);
    this.addSql(`alter table \`services_catalog\` drop column \`id_pricing_services_extra_id\`;`);

    this.addSql(`alter table \`services_catalog\` change \`id_pricing_id\` \`pricing_id\` int unsigned not null;`);
    this.addSql(`alter table \`services_catalog\` add constraint \`services_catalog_pricing_id_foreign\` foreign key (\`pricing_id\`) references \`pricing\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`services_catalog\` add index \`services_catalog_pricing_id_index\`(\`pricing_id\`);`);
  }

}
