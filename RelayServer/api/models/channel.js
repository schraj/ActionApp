import knex from './connector';

export function getChannel(id) {
  id = 1;
  const query = knex('Channel')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllChannels(limit, offset) {
  const query = knex('Channel')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getChannelCount() {
  const query = knex('Channel')
    .count();
  return query.then(rows => rows.map(row => (row['count(*)'] || '0')));
}

export function submitChannel(channelName, channelDescription) {
    return new Promise((resolve, reject) => {
      knex("Channel")
      .insert({
        ChannelName: channelName,
        ChannelDescription: channelDescription,
        ModifiedByUser: 'test'
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
}

