import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

import { queryLookups, addLookups, deleteLookups, deleteLookup} from './lookups'
import { getStates, getDistricts, getGovernmentLevels, addLookupItems, queryLookupItemsByLookup } from './lookupItems'
import { getFeds, queryOfficials, addOfficials, deleteOfficials } from './officials'
import { addChannels, queryChannels} from './channels'
import { addIssueHierarchy, queryIssues} from './issues'
import { addActions, queryActions} from './actions'

import issues from './Data/issues'

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

  // let offset = 500;
  // queryLookupItemsByLookup(client, "State").then((lookupItems)=> {
  //   getFeds(lookupItems).then((data)=>{
  //     addOfficials(client, data, offset).then((data)=> {
  //       console.log(data);
  //     })
  //   });
  // });


  // let channels = [];
  // channels.push({
  //   channelName: "Democracy",
  //   channelDescription: "The fight for our country."
  //   })
  // addChannels(client, channels).then((data)=> {
  //   console.log(data);
  // })

  let channelName = "Democracy";
  issues.map(i => {
    addIssueHierarchy(client, channelName, i)
  })

  // queryOfficials(client).then((data)=> {
  //   deleteOfficials(client, data.officials).then((data)=> {
  //     console.log(data);
  //   });
  // })

  // queryLookups(client).then((data)=> {
  //   deleteLookups(client, data.lookups).then((data)=> {
  //     console.log(data);
  //   });
  // })
}

main()
