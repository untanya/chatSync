import { Migration } from '@mikro-orm/migrations';

export class Migration20250222110416 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`pseudo\` varchar(255) not null, \`contact_info\` varchar(255) not null, \`base_city\` varchar(255) not null, \`token\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`);
  }

}
