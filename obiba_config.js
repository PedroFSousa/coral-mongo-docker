/* 
* Configure MongoDB according to:
* - http://agatedoc.obiba.org/en/latest/admin/configuration.html#mongodb-server-configuration
* - http://micadoc.obiba.org/en/latest/admin/configuration.html#mongodb-server-configuration
*/

// connect to admin db
db = connect("localhost:27017/admin");
db.getSiblingDB("admin").auth(username, password);

// set MONGODB-CR as the default challenge mechanism
//var schema = db.system.version.findOne({"_id" : "authSchema"});
//schema.currentVersion = 3;
//db.system.version.save(schema);

db.createRole({
    role: 'obibauser',
    privileges:[{
        resource: {anyResource: true},
        actions: ['anyAction']
    }],
    roles: []
});

db.grantRolesToUser(
    username,
    [
      {
        "role" : "readWrite",
        "db" : "agate"
      },
      {
        "role" : "dbAdmin",
        "db" : "agate"
      },
      {
        "role" : "readWrite",
        "db" : "mica"
      },
      {
        "role" : "dbAdmin",
        "db" : "mica"
      },
      {
        "role" : "obibauser",
        "db" : "admin"
      },
      {
        "role": "clusterMonitor",
        "db": "admin"
      },
      {
        "role": "readAnyDatabase",
        "db": "admin"
      }
    ]
);
