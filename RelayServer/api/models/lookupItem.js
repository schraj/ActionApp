import knex from './connector';

export function getLookupItem(id) {
  const query = knex('LookupItem')
    .where({ ID: id });
  return query.then(([row]) => row);
}

export function getAllLookupItems(limit, offset) {
  const query = knex('LookupItem')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getLookupItemsByLookupId(lookup_ID) {
  const query = knex('LookupItem')
    .where({ Lookup_ID: lookup_ID });
  return query.then(rows => (rows || []));
}

export function submitLookupItem(lookupId, lookupItemDefinition, lookupItemName, displayName, lookupItemDescription) {
    return new Promise((resolve, reject) => {
      knex("ActionItem")
    .insert({
      Lookup_ID: lookupId,
      LookupItemDefinition: LookupItemDefinition,
      LookupItemName: LookupItemName,
      DisplayName: displayName,
      LookupItemDescription: LookupItemDescription,
      ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });}



