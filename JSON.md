# JSON Support #

## IMPORTANT ##
### To set a non-string value to a cookie, the standard [JSON](http://www.json.org/) API must be available to the library. ###

## More Information ##
Many of the latest browsers now have native support for JSON serialization and unserialization.  The API's primary methods are JSON.stringify (serialize) and JSON.parse (unserialize).  To ensure every browser your code lands in has the API, you need to provide a JSON library which will enhance browsers that are missing the functionality.

Douglas Crockford has a library (**[json2.js](https://github.com/douglascrockford/JSON-js)**) available to provide this API in browsers which do not yet have it.  json2.js is written in such a way that it checks for the presence of the API before attempting to insert it, so in browsers which already have it available you'll have the benefit of fast native parsing.

**This cookie library will serialize values which are not strings upon set of a cookie, as well as unserialize values on retrieval, _if_ the JSON API is available.  To ensure it is available, get Crockford's script and include it in your page _before_ jQuery and this plugin.**

```
 <script type="text/javascript" src="/js/json2.js"></script>
```

**Note:** The native browser parsing is more strict than any other version of JSON parsing, so ensure that your JSON is properly formed when setting any cookie to a JSON value.  The library takes care of serialization for you upon set, so from the client point of view this is not a big concern.  But if you are setting JSON to a cookie from any other source (like server side scripts) ensure you are setting properly formatted JSON so this cookie library can read it if desired.