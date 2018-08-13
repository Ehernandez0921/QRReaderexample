import Dexie from 'dexie';
const db = new Dexie('MyDb');
db.version(1).stores({
  users: '++id, isMe'
});
export default db;