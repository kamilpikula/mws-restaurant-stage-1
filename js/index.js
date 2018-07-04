if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var dbPromise = idb.open('test-db', 1, function(upgradeDb) {
   var keyValStore = upgradeDb.createObjectStore('keyval');
   keyValStore.put('world', 'hello');
});

dbPromise.then(function(db) {
    var tx = db.transaction('keyval');
    var keyValStore = tx.objectStore('keyval');
    return keyValStore.get('hello');
}).then(function(val) {
    console.log('The value of "hello" is:', val);
});

dbPromise.then(function(db) {
    var tx = db.transaction('keyval', 'readwrite');
    var keyValStore = tx.objectStore('keyval');
    keyValStore.put('bar', 'foo');
    return tx.complete;
}).then(function() {
    console.log('Added foo:bar to keyval');
});
