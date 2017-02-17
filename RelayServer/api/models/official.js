import knex from './connector';

export function getOfficial(id) {
  const query = knex('Official')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllOfficials(limit, offset) {
  const query = knex('Official')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getOfficialsByActionItem(id) {
  const query = knex('Official')
    .innerJoin('ActionItem_Official', 'Official.ID', 'ActionItem_Official.Official_ID')
    .where({ ActionItem_ID: id });
  return query.then(rows => (rows || []));
}

export function getOfficialCount() {
  const query = knex('Official')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitOfficial( firstName, lastName, governmentLevelId, geographyId, gender, phone, email, url, contactForm
,twitter, facebook) {
    return new Promise((resolve, reject) => {
      knex("Official")
    .insert({
      FirstName: firstName,
      LastName: lastName,
      GovernmentLevelId: GovernmentLevelId,
      GeographyId: geographyId,
      Gender: gender,
      Phone: phone,
      Url: url,
      ContactForm: contactForm,
      Twitter: twitter,
      Facebook: facebook,
      ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
}
