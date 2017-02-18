import knex from './connector';

// Mock authenticated ID
const VIEWER_ID = '1';


export function getAppUser(id) {
  const query = knex('appuser')
    .where({ id });
  return query.then(([row]) => row);
}

export function getAllAppUsers(limit, offset) {
  const query = knex('appuser')
    .orderBy('CreatedDateTime', 'desc');

  if (limit !== -1) {
    query.limit(limit).offset(offset);
  }

  return query.then(rows => (rows || []));
}

export function getActedUponActionItemsByAppUser(id) {
  const query = knex('appuser')
    .innerJoin('AppUser_ActionItem', 'appuser.ID', 'appuser_actionitem.appuser_ID')
    .where({ ActionItem_ID: id });
  return query.then(rows => (rows || []));
}

export function submitAppUser( firstName, lastName, email, address1, address2, zipcode, city, state, gender, points) {
    return new Promise((resolve, reject) => {
      knex("appuser")
    .insert({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Address1: address1,
      Address2: address2,
      Zipcode: zipcode,
      City: city,
      State: state,  
      Gender: gender,
      Points: points
      }, "ID").then((ret) => {
        resolve(ret[0])
      });
    });
}

export function handleActionItem(actionItem_ID, appUser_ID, handleactionType) {
    let completed = handleActionType == 1
    let skipped = handleActionType == 2

    return new Promise((resolve, reject) => {
      knex("appuser_actionitem")
      .insert({
        ActionItem_ID: actionItem_ID,
        AppUser_ID: appUser_ID,
        Completed: completed,
        Skipped: skipped
      }, "ID").then(()=>{
        resolve(ret[0]);
      });
    });
}

export function getViewer() {
  return getAppUser(VIEWER_ID);
}

