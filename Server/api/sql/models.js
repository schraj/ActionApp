import knex from './connector';

export class Events {
  // getEventsById(id) {
  //   const query = knex('Data.Event')
  //     .where({ id });
  //   return query.then(([row]) => row);
  // }

  // getAll(limit, offset) {
  //   const query = knex('Data.Event')
  //     .orderBy('CreatedDateTime', 'desc');

  //   if (limit !== -1) {
  //     query.limit(limit).offset(offset);
  //   }

  //   return query.then(rows => (rows || []));
  // }

  getEventCount() {
    const query = knex('Data.Event')
      .count();
    return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
  }

  // submitEvent(eventName, eventDate, eventTime, eventDescription, eventType, username) {
  //   return knex.transaction(trx => trx('Data.Event')
  //     .insert({
  //       EventName: eventName,
  //       EventDate : eventDate,
  //       EventTime: eventTime,
  //       EventType: eventType,
  //       EventDescription: eventDescription,
  //       //CreatedDateTime: Date.now(),
  //       //ModifiedDateTime: Date.now(),
  //       ModifiedByUser: username
  //     }));
  // }
}
