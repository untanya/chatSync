import { Migration } from '@mikro-orm/migrations';

export class Migration20250223183650 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`message\` modify \`created_at\` datetime not null default CURRENT_TIMESTAMP;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`message\` modify \`created_at\` datetime not null;`);
  }

}
