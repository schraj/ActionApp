import knex from './connector';

export function getPoliticalEvent(id) {
  const query = knex('PoliticalEvent')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllPoliticalEvents(limit, offset) {
  const query = knex('PoliticalEvent')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getPoliticalEventCount() {
  const query = knex('PoliticalEvent')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitPoliticalEvent(eventName, eventDate, eventTime, eventDescription, eventType) {
    return new Promise((resolve, reject) => {
      knex("PoliticalEvent")
    .insert({
      EventName: eventName,
      EventDate: eventDate,
      EventTime: eventTime,
      EventType: eventType,
      EventDescription: eventDescription,
      CreatedDateTime: Date.now(),
      ModifiedDateTime: Date.now(),
      ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
  }


