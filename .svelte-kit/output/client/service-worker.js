var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = globalThis && globalThis.__generator || function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
exports.__esModule = true;
var _service_worker_1 = require("$service-worker");
var worker = self;
var FILES = "cache".concat(_service_worker_1.timestamp);
var to_cache = _service_worker_1.build.concat(_service_worker_1.files);
var staticAssets = new Set(to_cache);
worker.addEventListener("install", function(event) {
  event.waitUntil(caches.open(FILES).then(function(cache) {
    return cache.addAll(to_cache);
  }).then(function() {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", function(event) {
  event.waitUntil(caches.keys().then(function(keys) {
    return __awaiter(void 0, void 0, void 0, function() {
      var _i, keys_1, key;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            _i = 0, keys_1 = keys;
            _a.label = 1;
          case 1:
            if (!(_i < keys_1.length))
              return [3, 4];
            key = keys_1[_i];
            if (!(key !== FILES))
              return [3, 3];
            return [4, caches["delete"](key)];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            _i++;
            return [3, 1];
          case 4:
            worker.clients.claim();
            return [2];
        }
      });
    });
  }));
});
function fetchAndCache(request) {
  return __awaiter(this, void 0, void 0, function() {
    var cache, response, err_1, response;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4, caches.open("offline".concat(_service_worker_1.timestamp))];
        case 1:
          cache = _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 6]);
          return [4, fetch(request)];
        case 3:
          response = _a.sent();
          cache.put(request, response.clone());
          return [2, response];
        case 4:
          err_1 = _a.sent();
          return [4, cache.match(request)];
        case 5:
          response = _a.sent();
          if (response)
            return [2, response];
          throw err_1;
        case 6:
          return [2];
      }
    });
  });
}
worker.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  var url = new URL(event.request.url);
  var isHttp = url.protocol.startsWith("http");
  var isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  var isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  var skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var cachedAsset, _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = isStaticAsset;
              if (!_a)
                return [3, 2];
              return [4, caches.match(event.request)];
            case 1:
              _a = _b.sent();
              _b.label = 2;
            case 2:
              cachedAsset = _a;
              return [2, cachedAsset || fetchAndCache(event.request)];
          }
        });
      });
    }());
  }
});