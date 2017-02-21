import fs from 'fs'
import readline from 'readline'
import { queryLookups } from './lookups'

export function queryOfficials(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            officials: allOfficials {
                id
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function queryOfficialsByGeographyAndGovernmentLevel(client, geographyId, governmentLevelId) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            officials: allOfficials(filter: {governmentLevelId: "${governmentLevelId}", geographyId: "${geographyId}"}) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}


export function getFeds(stateLookupItems){
  var p = new Promise((resolve, reject)=>{

    let lines = [];
    var lineReader = readline.createInterface({
        input: fs.createReadStream('./data/legislators-current.csv')
    });

    lineReader.on('line', function (line) {
        lines.push(line.split(','));
    });

    lineReader.on('close', function () {
        let officials = []
        lines.map(l => {
            let lookupItem = stateLookupItems.find(li => li.lookupItemName.trim() == l[5].trim());
            let stateId = '';
            if (lookupItem){
                stateId = lookupItem.lookupItemDefinition;
            }
            
            let geographyId = l[4]==='sen'? `${stateId}`: `${stateId}-${l[6]}`;
            let governmentLevelId = l[4] === 'sen'? 'FedSen' : 'FedHouse';
            let gender = l[3]=== 'M' ? 'Male' : 'Female';    

            officials.push({
                firstName: l[1],
                lastName: l[0],
                geographyId: geographyId,
                governmentLevelId: governmentLevelId,
                gender: gender,
                party:l[7],
                phone:l[10],
                email:'',
                url:l[8],
                contactForm:l[11],
                twitter:l[13],
                facebook:l[14]                
            })
        });

        resolve(officials);
    });
  })

  return p;    
}

// can be last|first, "MyFederalSenators", "MyFederalRepresentative"
// This will return a list of the officials' ids
export function getOfficialsByKeywords(client, officialsByKeywords) {
  let ids = [];
  let keywords = officialsByKeywords.split(',');
  keywords.map(k => {
      if (k === "MyFederalSenators"){
        ids.push('cizer8zhycw1j0191tcjsnhgl') // cantwell
        ids.push('cizerbwtyeasg0191y3flric8') // murray        
      }

      if (k === "MyFederalRepresentative"){
        ids.push('cizercxz5h8pu0191ntzfrqe1') // heck
      }

      if (k==="cantwell|maria"){
        ids.push('cizer8zhycw1j0191tcjsnhgl') // cantwell          
      }
      if (k==="murray|patty"){
        ids.push('cizerbwtyeasg0191y3flric8') // murray        
      }
  });

  return ids;
}

export function addOfficials(client, officials, offset) {
  var toAdd = officials.slice(offset, offset + 100);
  let adds = toAdd.map((o) => {
     addOfficial(client, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addOfficial(client, official) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
            createOfficial(
                firstName: "${official.firstName}",
                lastName: "${official.lastName}",
                governmentLevelId: "${official.governmentLevelId}",
                geographyId: "${official.geographyId}",
                gender: ${official.gender},
                party: ${official.party},
                phone: "${official.phone}",
                email: "${official.email}",
                url: "${official.url}",
                contactForm: "${official.contactForm}",
                twitter: "${official.twitter}",
                facebook: "${official.facebook}",
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        });
  })
  return p;
}

export function deleteOfficials(client, officials) {
  let deletes = officials.map((l) => {
     deleteOfficial(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteOfficial(client, official) {
  var p = new Promise((resolve, reject)=>{
    client.mutate(`{
        deleteOfficial(
            id: "${official.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
