import knex from './connector';

export function getIssue(id) {
  const query = knex('Issue')
    .where({ id });
  return query.then(([row]) => row);
}

export function getIssueByName(name) {
  const query = knex('Issue')
    .where({ IssueName: name });
  return query.then(([row]) => row);
}

export function getAllIssues(limit, offset) {
  const query = knex('Issue')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getIssueCount() {
  const query = knex('Issue')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitIssue(issueName, issueDescription) {
    return new Promise((resolve, reject) => {
      knex("Issue")
      .insert({
        IssueName: issueName,
        IssueDescription: issueDescription,
        ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
}

