import knex from './connector';

export function getActionItem(id) {
  const query = knex('ActionItem')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllActionItems(limit, offset) {
  const query = knex('ActionItem')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getActionItemsByIssue(issue_ID) {
  const query = knex('ActionItem')
    .where({ Issue_ID: issue_ID });
  return query.then(rows => (rows || []));
}

export function getActionItemByName(name) {
  const query = knex('ActionItem')
    .where({ ResourceName: name });
  return query.then(([row]) => row);
}

export function getActionItemsByOfficial(id) {
  const query = knex('ActionItem')
    .innerJoin('ActionItem_Official', 'ActionItem.ID', 'ActionItem_Official.ActionItem_ID')
    .where({ Official_ID: id });
  return query.then(rows => (rows || []));
}

export function getAll(limit, offset) {
  const query = knex('ActionItem')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getActionItemCount() {
  const query = knex('ActionItem')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitActionItem(actionItemName, actionItemStartDate, actionItemEndDate, actionItemType, actionItemDescription, username) {
  return knex.transaction(trx => trx('ActionItem')
    .insert({
      ActionItemName: actionItemName,
      ActionItemStartDate: actionItemStartDate,
      ActionItemEndDate: actionItemEndDate,
      ActionItemType: actionItemType,
      ActionItemDescription: actionItemDescription,
      ModifiedByUser: username
    }));
}

