import fs from 'fs'
import readline from 'readline'

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

export function addIssue(client, channelId, issue) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createIssue(
                issueName: "${issue.issueName}",
                issueDescription: "${issue.IssueDescription}",
                channelId: "${channelId}"
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
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
