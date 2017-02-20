import fs from 'fs'
import readline from 'readline'
import { queryLookups } from './lookups'

export function queryLookupItems(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            lookups: allLookupItems {
            id
            lookupItemName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function getGovernmentLevels(){
    let lookupItems = [];
    lookupItems.push({lookupItemDefinition: "FedPresident", lookupItemName: "FedPresident", lookupItemDescription: "Federal President", displayName: "Federal President"})
    lookupItems.push({lookupItemDefinition: "FedHouse", lookupItemName: "FedHouse", lookupItemDescription: "Federal House", displayName: "Federal House"})
    lookupItems.push({lookupItemDefinition: "FedSen", lookupItemName: "FedSen", lookupItemDescription: "Federal Senate", displayName: "Federal Senate"})
    lookupItems.push({lookupItemDefinition: "StateGov", lookupItemName: "StateGov", lookupItemDescription: "State Governor", displayName: "State Governor"})
    lookupItems.push({lookupItemDefinition: "StateHouse", lookupItemName: "StateHouse", lookupItemDescription: "State House", displayName: "State House"})
    lookupItems.push({lookupItemDefinition: "StateSen", lookupItemName: "StateSen", lookupItemDescription: "State Senator", displayName: "State Senator"})
    return lookupItems;
}

export function getStates(){
  var p = new Promise((resolve, reject)=>{

    let lines = [];
    var lineReader = readline.createInterface({
        input: fs.createReadStream('./data/states.csv')
    });

    lineReader.on('line', function (line) {
        lines.push(line.split(','));
    });

    lineReader.on('close', function () {
        var lookupItems = []
        lines.map(l => {
            lookupItems.push({
                lookupItemDefinition: l[2],
                lookupItemName: l[1],
                lookupItemDescription: l[0],
                displayName: l[0]
            })
        });

        resolve(lookupItems);
    });
  })

  return p;    
}

export function getDistricts(districtType){
  var p = new Promise((resolve, reject)=>{

    let lines = [];
    var lineReader = readline.createInterface({
        input: fs.createReadStream(`./data/${districtType}.csv`)
    });

    lineReader.on('line', function (line) {
        lines.push(line.split(','));
    });

    lineReader.on('close', function () {
        var lookupItems = []
        lines.map(l => {
            lookupItems.push({
                lookupItemDefinition: l[1],
                lookupItemName: l[1],
                lookupItemDescription: l[2],
                displayName: l[2]
            })
        });

        resolve(lookupItems);
    });
  })

  return p;    
}

export function addLookupItems(client, lookupId, lookupItems) {
  let adds = lookupItems.map((l) => {
     addLookupItem(client, lookupId, l)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addLookupItem(client, lookupId, lookupItem) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
            createLookupItem(
                lookupItemDefinition: "${lookupItem.lookupItemDefinition}",
                lookupItemName: "${lookupItem.lookupItemName}",
                lookupItemDescription: "${lookupItem.lookupItemDescription}",
                displayName: "${lookupItem.displayName}",
                lookupId: "${lookupId}"
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        });
  })
  return p;
}

export function deleteLookupItems(client, lookupItems) {
  let deletes = lookupItems.map((l) => {
     deleteLookupItem(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteLookup(client, lookup) {
  var p = new Promise((resolve, reject)=>{
    console.log(lookup)
    client.mutate(`{
        deleteLookup(
            id: "${lookup.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
