import fs from 'fs'
import readline from 'readline'

export function queryChannels(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            channels: allChannels {
                id
                channelName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function addChannels(client, channels) {
  let adds = channels.map((o) => {
     addChannel(client, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addChannel(client, channel) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createChannel(
                channelName: "${channel.channelName}",
                channelDescription: "${channel.channelDescription}",
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data);
        });
  })
  return p;
}

export function deleteChannels(client, channels) {
  let deletes = channels.map((l) => {
     deleteChannel(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteChannel(client, channel) {
  var p = new Promise((resolve, reject)=>{
    client.mutate(`{
        deleteChannel(
            id: "${channel.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
