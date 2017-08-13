console.log("[DB] Attempting Conenction..");
const mongoose = require('mongoose');

const db_conn = mongoose.createConnection(config.db_url);

console.log("[Mongo Blogging] Attempting Conenction..");
db_conn.on('error', console.error.bind(console, '[Mongo Blogging] Error: '));
db_conn.once('open', function callback() {
  console.log("[Mongo Blogging] Connected..");
});

if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging') {
  mongoose.set('debug', true);
}

config.db_conn = db_conn;

module.exports = {
  db_conn: db_conn,
};