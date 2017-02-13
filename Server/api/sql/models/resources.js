import knex from './connector';

export class Resources {
  getResourceById(id) {
    const query = knex('Resource')
      .where({ id });
    return query.then(([row]) => row);
  }

  getResourceByName(name) {
    const query = knex('Resource')
      .where({ ResourceName: name });
    return query.then(([row]) => row);
  }

  getAll(limit, offset) {
    const query = knex('Resource')
      .orderBy('CreatedDateTime', 'desc');

    if (limit !== -1) {
      query.limit(limit).offset(offset);
    }

    return query.then(rows => (rows || []));
  }

  getResourceCount() {
    const query = knex('Resource')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitResource(resourceName, url, media, resourceDescription, username) {
    return knex.transaction(trx => trx('Resource')
      .insert({
        ResourceName: ResourceName,
        Url: url,
        Media: media,
        ResourceDescription: resourceDescription,
        ModifiedByUser: username
      }));
  }
}
