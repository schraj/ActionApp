import fs from 'fs'
import readline from 'readline'

export function queryActions(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            actions: allActions {
                id
                actionName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function addActions(client, actions) {
  let adds = Actions.map((o) => {
     addAction(client, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addAction(client, issueId, action) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createAction(
                actionName: "${action.ActionName}",
                actionDescription: "${action.ActionDescription}",
                issueId: "${issueId}"
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        });
  })
  return p;
}

export function deleteActions(client, actions) {
  let deletes = actions.map((l) => {
     deleteAction(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteAction(client, action) {
  var p = new Promise((resolve, reject)=>{
    client.mutate(`{
        deleteAction(
            id: "${action.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
