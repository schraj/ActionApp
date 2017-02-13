import knex from './connector';

export class Officials {
  getOfficialById(id) {
    const query = knex('Official')
      .where({ id });
    return query.then(([row]) => row);
  }

  getAll(limit, offset) {
    const query = knex('Official')
      .orderBy('CreatedDateTime', 'desc');

    if (limit !== -1) {
      query.limit(limit).offset(offset);
    }

    return query.then(rows => (rows || []));
  }

  getOfficialCount() {
    const query = knex('Official')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitOfficial(officialName, firstName, officialDescription, username) {
    return knex.transaction(trx => trx('Official')
      .insert({
        OfficialName: officialName,
        DisplayName: firstName,
        OfficialDescription: officialDescription,
        ModifiedByUser: username
      }));
  }
}
