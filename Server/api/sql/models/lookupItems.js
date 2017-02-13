import knex from './connector';

export class LookupItems {
  getLookupItemsByLookupId(lookup_ID) {
    const query = knex('LookupItem')
      .where({ Lookup_ID: lookup_ID });
    return query.then(([row]) => row);
  }

  submitLookupItem(lookupItemDefinition, lookupItemName, displayName, lookupItemDescription, username) {
    return knex.transaction(trx => trx('LookupItem')
      .insert({
        LookupItemDefinition: LookupItemDefinition,
        LookupItemName: LookupItemName,
        DisplayName: displayName,
        LookupItemDescription: LookupItemDescription,
        ModifiedByUser: username
      }));
  }
}
