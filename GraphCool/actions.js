import fs from 'fs'
import readline from 'readline'

import { getOfficialsByKeywords } from './officials'

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

export function addActions(client, issueId, actions) {
  let adds = actions.map((o) => {
     addAction(client, issueId, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addAction(client, issueId, action) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createAction(
                actionName: "${action.actionName}",
                actionDescription: "${action.actionDescription}",
                actionStartDate: "${action.actionStartDate}",
                actionEndDate: "${action.actionEndDate}",
                actionType: ${action.actionType},
                issueId: "${issueId}"   
            ) {
                id
            }
        }`).then((data)=> {
            let createdActionId = data.createAction.id;
            if (action.officialsByKeywords){
                let officialIds = getOfficialsByKeywords(client, action.officialsByKeywords)
                //console.log(`got officialIds: ${officialIds}`)

                addActionsOfficialsRelations(client, officialIds, createdActionId)
                .then(data => {
                    resolve(createdActionId);
                })
            } else {
                resolve(createdActionId);                
            }
        });
  })
  return p;
}

export function addActionsOfficialsRelations(client, officialIds, actionId) {
  let adds = officialIds.map((id) => {
     addActionsOfficialsRelation(client,id, actionId)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addActionsOfficialsRelation(client, officialId, actionId) {
 //console.log(`adding relation: ${officialId}-${actionId}`)

  var p = new Promise((resolve, reject)=>{
    client.mutate(`{
        addToActionsOfficials(actionsActionId: "${actionId}", officialsOfficialId: "${officialId}") {
            actionsAction {
            id
            }
            officialsOfficial {
            id
            }
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
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
