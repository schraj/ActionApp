import Reindex from '../Reindex';

const contacts = [
  { lastName: 'last', firstName: 'first', isFriend: false, latitude: 45.2, longitude: -137 },
  { lastName: 'huyn', firstName: 'van', isFriend: true, latitude: 45.4, longitude: -137 },
  { lastName: 'schrader', firstName: 'jere', isFriend: false, latitude: 45.5, longitude: -138 },
];

const mutation = `
mutation ImportContact($contact: _CreateContactInput!) {
  createContact(input: $contact) {
    id
  }
}
`;

async function importContacts() {
  for (const contact of contacts) {
    const result = await Reindex.query(mutation, { contact });
    if (result.errors) {
      console.error(result.errors);
    } else {
      console.log('Created a contact with id:', result.data.createContact.id);
    }
  }
}

importContacts().catch((e) => console.error(e));