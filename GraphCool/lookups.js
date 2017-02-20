export function queryLookups(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            lookups: allLookups {
            id
            lookupName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function addMainLookups(client){
  var lookups = [];
  lookups.push({lookupName:"State", displayName:"State"});
  lookups.push({lookupName:"CongressionalDistrict", displayName:"Congressional District"});
  lookups.push({lookupName:"LegislativeDistrict", displayName:"Legislative District"});
  lookups.push({lookupName:"GovernmentLevel", displayName:"Government Level"});
  return addLookups(client, lookups);
}

export function addLookups(client, lookups) {
  let adds = lookups.map((l) => {
     addLookup(client,l)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addLookup(client, lookup) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
            createLookup(
                lookupName: "${lookup.lookupName}",
                lookupDescription: "${lookup.displayName}",
                displayName: "${lookup.displayName}"
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        });
  })
  return p;
}

export function deleteLookups(client, lookups) {
  let deletes = lookups.map((l) => {
     deleteLookup(client,l)
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
