import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../modules/user/user.entity.js';

export class TestSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      pseudo: 'Foo Bar',
      contact_info: 'foo bar number',
      base_city: 'Grenoble',
      token: 'someToken'
    });
  }

}
