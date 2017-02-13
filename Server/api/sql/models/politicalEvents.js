import knex from './connector';

export class PoliticalEvents {
  getEventsById(id) {
    const query = knex('PoliticalEvent')
      .where({ id });
    return query.then(([row]) => row);
  }

  getAll(limit, offset) {
    const query = knex('PoliticalEvent')
      .orderBy('CreatedDateTime', 'desc');

    if (limit !== -1) {
      query.limit(limit).offset(offset);
    }

    return query.then(rows => (rows || []));
  }

  getPoliticalEventCount() {
    const query = knex('PoliticalEvent')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  submitPoliticalEvent(eventName, eventDate, eventTime, eventDescription, eventType, username) {
    return knex.transaction(trx => trx('PoliticalEvent')
      .insert({
        EventName: eventName,
        EventDate : eventDate,
        EventTime: eventTime,
        EventType: eventType,
        EventDescription: eventDescription,
        CreatedDateTime: Date.now(),
        ModifiedDateTime: Date.now(),
        ModifiedByUser: username
      }));
  }
}

