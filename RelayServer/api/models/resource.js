import knex from './connector';

export function getResource(id) {
  const query = knex('Resource')
    .where({ id });
  return query.then(([row]) => row);
}

export function getResourcesByOfficial(id) {
  const query = knex('Resource')
    .innerJoin('Resource_Official', 'Resource.ID', 'Resource_Official.Resource_ID')
    .where({ Official_ID: id });
  return query.then(rows => (rows || []));
}

export function getResourcesByPoliticalEvent(id) {
  const query = knex('Resource')
    .innerJoin('Resource_PoliticalEvent', 'Resource.ID', 'Resource_PoliticalEvent.PoliticalEvent_ID')
    .where({ Official_ID: id });
  return query.then(rows => (rows || []));
}

export function getResourcesByIssue(id) {
  const query = knex('Resource')
    .innerJoin('Resource_Issue', 'Resource.ID', 'Resource_Issue.Issue_ID')
    .where({ Official_ID: id });
  return query.then(rows => (rows || []));
}

export function getResourceByName(name) {
  const query = knex('Resource')
    .where({ ResourceName: name });
  return query.then(([row]) => row);
}

export function getAllResources(limit, offset) {
  const query = knex('Resource')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getResourceCount() {
  const query = knex('Resource')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitResource(resourceName, url, media, resourceDescription, username) {
  return knex.transaction(trx => trx('Resource')
    .insert({
      ResourceName: ResourceName,
      Url: url,
      Media: media,
      ResourceDescription: resourceDescription,
      ModifiedByUser: username
    }));
}
