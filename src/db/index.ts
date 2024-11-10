import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

const localDB = new PouchDB('dghealth_local');
const remoteDB = new PouchDB('http://your-remote-server/dghealth');

export const syncDatabases = () => {
  return localDB.sync(remoteDB, {
    live: true,
    retry: true,
  }).on('change', (change) => {
    console.log('db changed', change);
  }).on('error', (err) => {
    console.error('sync error', err);
  });
};

export const db = localDB;