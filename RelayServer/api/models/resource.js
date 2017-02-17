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
    .where({ PoliticalEvent_ID: id });
  return query.then(rows => (rows || []));
}

export function getResourcesByIssue(id) {
  const query = knex('Resource')
    .innerJoin('Resource_Issue', 'Resource.ID', 'Resource_Issue.Issue_ID')
    .where({ Issue_ID: id });
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

export function submitResource(resourceName, url, media, resourceDescription, resourceRelationType, resourceRelationId) {
  return new Promise((resolve, reject) => {
    knex("Resource")
      .insert({
        ResourceName: resourceName,
        Url: url,
        Media: media,
        ResourceDescription: resourceDescription,
        ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        if (resourceRelationType) {
          // save the resource
          saveResourceRelation(ret[0], resourceRelationType, resourceRelationId)
        }
        resolve(ret[0])
      });
  });
}

function saveResourceRelation(resourceId, resourceRelationType, resourceRelationId){
  switch (resourceRelationType){
    case 1: {
      saveOfficialRelation(resourceId, resourceRelationId)
      break;
    }
    case 2: {
      savePoliticalEventRelation(resourceId, resourceRelationId)
      break;
    }
    case 3: {
      saveIssueRelation(resourceId, resourceRelationId)
      break;
    }
  }
}

function saveOfficialRelation(resourceId, relationId){
  return knex("resource_official")
     .insert({
        Resource_Id: resourceId,
        Official_ID: relationId,
        ModifiedByUser: 'test'
      });
}

function savePoliticalEventRelation(resourceId, relationId){
  return knex("resource_politicalevent")
     .insert({
        Resource_Id: resourceId,
        PoliticalEvent_ID: relationId,
        ModifiedByUser: 'test'
      });
}

function saveIssueRelation(resourceId, relationId){
  return knex("resource_issue")
     .insert({
        Resource_Id: resourceId,
        Issue_ID: relationId,
        ModifiedByUser: 'test'
      });
}
