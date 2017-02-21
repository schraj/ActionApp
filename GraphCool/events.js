import fs from 'fs'
import readline from 'readline'
import { queryLookups } from './lookups'

export function queryEvents(client) {
  var p = new Promise((resolve, reject)=>{
        client.query(`{
            lookups: allEvents {
                id
                eventName
            }
        }`).then((data)=> {
            resolve(data);
        })
  })
  return p;
}

export function addEvents(client, events) {
  let adds = events.map((o) => {
     addEvent(client, o)
  })  

  var results = Promise.all(adds);

  return results;
}

export function addEvent(client, event) {
  var p = new Promise((resolve, reject)=>{
        client.mutate(`{
           createEvent(
                eventName: "a sitin on the president's lawn",
                eventDescription: "this will be a large gathering to sit in",
                eventDate: "2017-03-03",
                eventType: Meeting
            ) {
                id
            }
        }`).then((data)=> {
            resolve(data.createEvent.id);
        });
  })
  return p;
}

export function deleteEvents(client, events) {
  let deletes = events.map((l) => {
     deleteEvent(client,l)
  })  

  var results = Promise.all(deletes);

  return results;
}

export function deleteEvent(client, event) {
  var p = new Promise((resolve, reject)=>{
    console.log(event)
    client.mutate(`{
        deleteEvent(
            id: "${event.id}"
        ) {
            id
        }
    }`).then((data)=> {
        resolve(data);
    }).catch((err) => console.log("rejected:", err))
  })
}
