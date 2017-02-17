import knex from './connector';

export function getLookup(id) {
  const query = knex('Lookup')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllLookups(limit, offset) {
  const query = knex('Lookup')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getLookupCount() {
  const query = knex('Lookup')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitLookup(lookupName, displayName, lookupDescription) {
    return new Promise((resolve, reject) => {
      knex("Lookup")
    .insert({
      LookupName: lookupName,
      DisplayName: displayName,
      LookupDescription: lookupDescription,
      ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
  }
