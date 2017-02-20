import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

import { queryLookups, addLookups, deleteLookups, deleteLookup} from './lookups'
import { getStates, getDistricts, getGovernmentLevels, addLookupItems } from './lookupItems'

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cizeauyua5b9l0120ne6ilz47')
})

function main() {
  // addLookups(client).then((data)=> {
  //   console.log(data);
  // })

  // getStates().then((lookupItems)=> {
  //   queryLookups(client).then((data)=> {
  //     var lookupId = data.lookups.find(l => l.lookupName === "State").id;
  //     addLookupItems(client, lookupId, lookupItems);
  //   })
  // });

  //let districtType = "CongressionalDistrict"
  // let districtType = "LegislativeDistrict"
  // getDistricts(districtType).then((lookupItems)=> {
  //   queryLookups(client).then((data)=> {
  //     var lookupId = data.lookups.find(l => l.lookupName === districtType).id;
  //     addLookupItems(client, lookupId, lookupItems);
  //   })
  // });

  var lookupItems = getGovernmentLevels();
  queryLookups(client).then((data)=> {
    var lookupId = data.lookups.find(l => l.lookupName === "GovernmentLevel").id;
    addLookupItems(client, lookupId, lookupItems);
  });


  // queryLookups(client).then((data)=> {
  //   deleteLookups(client, data.lookups).then((data)=> {
  //     console.log(data);
  //   });
  // })
}

main()
