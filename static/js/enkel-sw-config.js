
var ENKEL_SW_CONFIG = {
  'cdn': 'https://g.alicdn.com/kg/workbox/3.3.0/',
  'caches': {
    'version': 'v1',
    'prefix': 'QY:',
    'html': {
      'cacheName': 'html',
      'entries': 10,
      'maxAgeSeconds': 4320000,
      'strategies': 'staleWhileRevalidate'
    },
    'js': {
      'cacheName': 'js',
      'entries': 20,
      'maxAgeSeconds': 4320000,
      'strategies': 'staleWhileRevalidate'
    },
    'css': {
      'cacheName': 'css',
      'entries': 30,
      'maxAgeSeconds': 4320000,
      'strategies': 'staleWhileRevalidate'
    },
    'img': {
      'cacheName': 'img',
      'entries': 40,
      'maxAgeSeconds': 4320000,
      'strategies': 'staleWhileRevalidate'
    },
    'font': {
      'cacheName': 'font',
      'entries': 40,
      'maxAgeSeconds': 4320000,
      'strategies': 'staleWhileRevalidate'
    },
    'routes': [
      // {
      //   "pathname": "/pwa",
      //   "strategies": "staleWhileRevalidate",
      //   "cacheName": "route-pwa",
      //   "entries": 10,
      //   "maxAgeSeconds": 43200
      // }
      {
        'match': /^(?!.*?(sockjs-node))(?!.*?(\.hot-update\.json))(?!.*?(enkel\/index\/sse)).*$/,
        'strategies': 'staleWhileRevalidate',
        'cacheName': 'route',
        'entries': 30,
        'maxAgeSeconds': 4320000
      }
    ]
  }
}
