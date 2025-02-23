import { Migration } from '@mikro-orm/migrations';

export class Migration20250222215952 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`model\` add \`nationality\` varchar(255) not null, add \`ethnicity\` varchar(255) not null, add \`languages\` varchar(255) not null, add \`contact_method\` varchar(255) not null, add \`base_city\` varchar(255) not null, add \`contact_info\` varchar(255) not null, add \`work_location\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`model\` drop column \`nationality\`, drop column \`ethnicity\`, drop column \`languages\`, drop column \`contact_method\`, drop column \`base_city\`, drop column \`contact_info\`, drop column \`work_location\`;`);
  }

}
