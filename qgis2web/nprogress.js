importScripts('https://unpkg.com/runtime-memcache@3.0.0/dist/umd/index.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');


if (workbox) {
  // Workbox 加载完成
  // 修改默认配置
  workbox.core.setCacheNameDetails({
  prefix: 'app',
  suffix: 'v1',
  precache: 'precache',
  runtime: 'runtime'
 });

  // 打印修改结果

// 将打印 'app-precache-v1'
console.log(workbox.core.cacheNames.precache);
// 将打印 'app-runtime-v1'
console.log(workbox.core.cacheNames.runtime);
if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
    console.log('ENABLED');
  }
  //workbox.precaching.precacheAndRoute([
  //{'url':'webfonts/fa-solid-900.woff2',
//    'revision': null,},
  //{'url':'webfonts/fa-solid-900.ttf',
    //'revision': null,},
  //{'url':'index.html',
    //'revision': null,},
  //{'url':'legend/Gy_A_rice_weight_UTMz51_1.png',
  //'revision': null,},
  //{'url':'js/leaflet.js.map',
  //'revision': null,},
  //{'url':'js/Autolinker.min.js',
  //'revision': null,},
  //{'url':'js/labelgun.min.js',
  //'revision': null,},
  //{'url':'js/labels.js',
  //'revision': null,},
  //{'url':'js/leaflet-hash.js',
  //'revision': null,},
  //{'url':'js/leaflet-heat.js',
  //'revision': null,},
  //{'url':'js/leaflet-svg-shape-markers.min.js',
  //'revision': null,},
  //{'url':'js/leaflet-tilelayer-wmts.js',
  //'revision': null,},
  //{'url':'js/leaflet.js',
  //'revision': null,},
  //{'url':'js/leaflet.markercluster.js',
  //'revision': null,},
  //{'url':'js/leaflet.pattern.js',
  //'revision': null,},
  //{'url':'js/leaflet.rotatedMarker.js',
  //'revision': null,},
  //{'url':'js/Leaflet.VectorGrid.js',
  //'revision': null,},
  //{'url':'js/leaflet.wms.js','revision': null,},
  //{'url':'js/multi-style-layer.js','revision': null,},
  //{'url':'js/OSMBuildings-Leaflet.js','revision': null,},
  //{'url':'js/qgis2web_expressions.js','revision': null,},
  //{'url':'js/rbush.min.js','revision': null,},
  //{'url':'data/Gy_A_rice_weight_UTMz51_1.js','revision': null,},
  //{'url':'css/fontawesome-all.min.css','revision': null,},
  //{'url':'css/leaflet.css','revision': null,},
  //{'url':'css/MarkerCluster.css','revision': null,},
  //{'url':'css/MarkerCluster.Default.css','revision': null,},
  //{'url':'css/qgis2web.css','revision': null,},
  //{'url':'css/images/trash_@2X.png','revision': null,}
  //]);
}
const cacheVersion = 'v1';
const filesToCache = [
  {'url':'webfonts/fa-solid-900.woff2',
    'revision': null,},
  {'url':'webfonts/fa-solid-900.ttf',
    'revision': null,},
  {'url':'index.html',
    'revision': null,},
  //{'url':'leaflet-geojson-vt.js',
//    'revision': null,},
  {'url':'legend/Gy_A_rice_weight_UTMz51_1.png',
  'revision': null,},
  {'url':'js/leaflet.js.map',
  'revision': null,},
  {'url':'js/Autolinker.min.js',
  'revision': null,},
  {'url':'js/labelgun.min.js',
  'revision': null,},
  {'url':'js/labels.js',
  'revision': null,},
  {'url':'js/leaflet-hash.js',
  'revision': null,},
  {'url':'js/leaflet-heat.js',
  'revision': null,},
  {'url':'js/leaflet-svg-shape-markers.min.js',
  'revision': null,},
  {'url':'js/leaflet-tilelayer-wmts.js',
  'revision': null,},
  {'url':'js/leaflet.js',
  'revision': null,},
  {'url':'js/leaflet.markercluster.js',
  'revision': null,},
  {'url':'js/leaflet.pattern.js',
  'revision': null,},
  {'url':'js/leaflet.rotatedMarker.js',
  'revision': null,},
  {'url':'js/Leaflet.VectorGrid.js',
  'revision': null,},
  {'url':'js/leaflet.wms.js','revision': null,},
  {'url':'js/multi-style-layer.js','revision': null,},
  {'url':'js/OSMBuildings-Leaflet.js','revision': null,},
  {'url':'js/qgis2web_expressions.js','revision': null,},
  {'url':'js/rbush.min.js','revision': null,},
  {'url':'data/Gy_A_rice_weight_UTMz51_1.js','revision': null,},
  {'url':'css/fontawesome-all.min.css','revision': null,},
  {'url':'css/leaflet.css','revision': null,},
  {'url':'css/MarkerCluster.css','revision': null,},
  {'url':'css/MarkerCluster.Default.css','revision': null,},
  {'url':'css/qgis2web.css','revision': null,},
  {'url':'css/images/trash_@2X.png','revision': null,}
  ];
var store = new RMStore();
//console.log("strore:"+store.size());
// in the service worker
addEventListener('message', event => {
  // event is an ExtendableMessageEvent object
  console.log(event.data +'from 64MemCache');
  //store = JSON.parse(event.data);
  //console.log(store.size());
  //event.source.postMessage("Hi client");
});
//var store = globalThis.store;
//var store;
//const globalThis = this;
//this.store = new RMStore();
//console.log(Window);
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheVersion)
    .then(cache => {
      console.log('[ServiceWorker] Caching app shell');
      store.set(1,filesToCache);
      //cache.addAll(store.get(1));
      workbox.precaching.precacheAndRoute(store.get(1));
      //console.log("LENGTH-" + performance.getEntriesByName('Gy_A_rice_weight_UTMz51_1.js')[0];);
    })
  );
  // Bypass the waiting lifecycle stage,
  // just in case there's an older version of this SW registration.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
   // Take control of all pages under this SW's scope immediately,
  // instead of waiting for reload/navigation.
  event.waitUntil(self.clients.claim());
});



// Fetching resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(store.get(1));
      // if the request has query parameters, `hasQuery` will be set to `true`
      //var hasQuery = event.request.url.indexOf('?') != -1;
      //console.log(hasQuery.toString());
      try {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log("cachedResponse: ", event.request.url);
          return cachedResponse;
        }

        const fetchResponse = await fetch(event.request);
        if (fetchResponse) {
          console.log("fetchResponse: ", event.request.url);
          await cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }
      } catch (error) {
        console.log("Fetch failed: ", error);
        const cachedResponse = await cache.match("index.html");
        return cachedResponse;
      }
    })()
  );
});


function temp(){
      event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }




        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open(cacheVersion)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    ); 
    
    
/////////////////////////////////////////////////////////////////////////////    
    
       if (event.request.method != "GET" || event.request.mode == "cors" || event.request.url.startsWith('chrome-extension')){
        event.respondWith(fetch(event.request));
        return;
    }

  event.respondWith(
    caches.open(cacheVersion).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log('Service Worker: Returning 成功', response);
          return response;
        } else {
    return fetch(event.request).then(function(response) {
            console.log('Service Worker: Returning Response from Server', response);
            cache.put(event.request, response.clone());
            return response;
          }).catch((error) => {
            console.log('Fetch 失敗; returning offline page instead.', error);
            return caches.match('index.html');
          });
        }
      });
    }));
}