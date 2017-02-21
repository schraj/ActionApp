import fs from 'fs'
import readline from 'readline'
import { addActions } from './actions' 

export function queryIssues(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            issues: allIssues {
                id
                issueName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function addIssues(client, issues) {
  let adds = issues.map((o) => {
     addIssue(client, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addIssueHierarchy(client, channelName, issue) {
  // harcoded for now
  let channelId = "cizerylwttbcb0191qb3mxq0m"
  var p = new Promise((resolve, reject)=>{
      addIssue(client, channelId, issue)
        .then(issueId => {
            //console.log(`added issue: ${issueId}`)
            // add actions for issue    
            addActions(client, issueId, issue.actions)
                .then(data => {
                    //console.log(`added actions: ${data}`)
                    resolve(issue)
                });
        })
  })
  return p;
}


export function addIssue(client, channelId, issue) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createIssue(
                issueName: "${issue.issueName}",
                issueDescription: "${issue.issueDescription}",
                channelId: "${channelId}"
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data.createIssue.id);
        });
  })
  return p;
}

export function deleteIssues(client, issues) {
  let deletes = issues.map((l) => {
     deleteIssue(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteIssue(client, issue) {
  var p = new Promise((resolve, reject)=>{
    client.mutate(`{
        deleteIssue(
            id: "${issue.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
