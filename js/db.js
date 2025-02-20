// init db
const database = idb.open('liga-champion',1, function(upgrade){
  upgrade.createObjectStore('teams', {'keyPath': 'id'})
});

var addFavTeam = function(team) {
  database.then(function(db){
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams')
    store.put(team)
    return tx.complete
  })
  .then(function(){
    M.toast({html: `Team ${team.name} has been saved!`})
  })
  .catch(function(err){
    console.log('Error: ', err);
  })
}

function deleteFavTeam(team){
  database.then(function(db){
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(team.id)
  })
  .then(function(){
    M.toast({html: `Team ${team.name} has been deleted!`})
    loadFavTeams()
  })
  .catch(function(err){
    console.log('Error: ', err);
  })
}

function getFavTeams(){
  return database.then(function(db){
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  })
}