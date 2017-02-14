import knex from './connector';

export class Issues {
  getIssueById(id) {
    const query = knex('Issue')
      .where({ id });
    return query.then(([row]) => row);
  }

  getIssueByName(name) {
    const query = knex('Issue')
      .where({ IssueName: name });
    return query.then(([row]) => row);
  }

  getAll(limit, offset) {
    const query = knex('Issue')
      .orderBy('CreatedDateTime', 'desc');

    if (limit !== -1) {
      query.limit(limit).offset(offset);
    }

    return query.then(rows => (rows || []));
  }

  getIssueCount() {
    const query = knex('Issue')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitIssue(issueName, issueDescription, username) {
    return knex.transaction(trx => trx('Issue')
      .insert({
        IssueName: issueName,
        IssueDescription: issueDescription,
        ModifiedByUser: username
      }));
  }
}
