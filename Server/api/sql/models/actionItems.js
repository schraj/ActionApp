import knex from './connector';

export class ActionItems {
  getActionItemById(id) {
    const query = knex('ActionItem')
      .where({ id });
    return query.then(([row]) => row);
  }

  getActionItemsByIssue(issue_ID) {
    const query = knex('ActionItem')
      .where({ Issue_ID: issue_ID });
    return query.then(([row]) => row);
  }

  getActionItemByName(name) {
    const query = knex('ActionItem')
      .where({ ResourceName: name });
    return query.then(([row]) => row);
  }

  getAll(limit, offset) {
    const query = knex('ActionItem')
      .orderBy('CreatedDateTime', 'desc');

    if (limit !== -1) {
      query.limit(limit).offset(offset);
    }

    return query.then(rows => (rows || []));
  }

  getActionItemCount() {
    const query = knex('ActionItem')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitActionItem(actionItemName, actionItemStartDate, actionItemEndDate, actionItemType, actionItemDescription, username) {
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
}
