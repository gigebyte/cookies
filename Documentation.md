# How to use jquery.cookies.js #

  * [Without jQuery](#Without_jQuery.md)
  * [With jQuery](#With_jQuery.md)
  * [JSON Support](http://code.google.com/p/cookies/wiki/JSON)

  * [Get a cookie](#Get_a_cookie.md)
  * [Get Filtered list of cookies](#Get_Filtered_list_of_cookies.md)
  * [Set a cookie](#Set_a_cookie.md)
  * [Delete a cookie](#Delete_a_cookie.md)
  * [Test if browser is accepting cookies](#Test_if_browser_is_accepting_cookies.md)
  * [Set default options to use when none are specified](#Set_default_options_to_use_when_none_are_specified.md)

  * [Options object](#Options_object.md)

## Without jQuery ##

If jQuery is not available in your page, the core cookies library is available to you under the _jaaulde.utils_ namespace:

### Get a cookie ###
```
/**
 * get - get one, several, or all cookies
 *
 * @access public
 * @paramater Mixed cookieName - String:name of single cookie; Array:list of multiple cookie names; Void (no param):if you want all cookies
 * @return Mixed - Value of cookie as set; Null:if only one cookie is requested and is not found; Object:hash of multiple or all cookies (if multiple or all requested);
 */
get = function(cookieName)
```
#### Example: ####
  * `jaaulde.utils.cookies.get('myCookie');`
    * returns value of myCookie if it is present, null if not
  * `jaaulde.utils.cookies.get(['myCookie', 'myOtherCookie']);`
    * returns array containing value of each requested cookie if it is present, null if not
  * `jaaulde.utils.cookies.get();`
    * returns array of all cookies from your site

### Get Filtered list of cookies ###
```
/**
 * filter - get array of cookies whose names match the provided RegExp
 *
 * @access public
 * @paramater Object RegExp - The regular expression to match against cookie names
 * @return Mixed - Object:hash of cookies whose names match the RegExp
 */
filter = function( cookieNameRegExp )
```
#### Example: ####
  * `jaaulde.utils.cookies.filter( /^site/ );`
    * returns list of cookies whose names start with "site"

### Set a cookie ###
```
/**
 * set - set or delete a cookie with desired options
 *
 * @access public
 * @paramater String cookieName - name of cookie to set
 * @paramater Mixed value - Any JS value. If not a string, will be JSON encoded (http://code.google.com/p/cookies/wiki/JSON); NULL to delete
 * @paramater Object options - optional list of cookie options to specify
 * @return void
 */
set = function(cookieName, value, options)
```
#### Example: ####
  * `jaaulde.utils.cookies.set('myCookie', 'myValue');`
    * sets cookie by the name of 'myCookie' to value of 'myValue' with default options
  * `jaaulde.utils.cookies.set('myCookie', 'myValue', {path: '/somedir'});`
    * sets cookie by the name of 'myCookie' to value of 'myValue' with path of '/somedir'
  * **See information on options object below**

### Delete a cookie ###
```
/**
 * del - delete a cookie (domain and path options must match those with which the cookie was set; this is really an alias for set() with parameters simplified for this use)
 *
 * @access public
 * @paramater MIxed cookieName - String name of cookie to delete, or Bool true to delete all
 * @paramater Object options - optional list of cookie options to specify ( path, domain )
 * @return void
 */
del = function(cookieName, options)
```
#### Example: ####
  * `jaaulde.utils.cookies.del('myCookie');`
    * deletes a cookie, 'myCookie', with default options
  * `jaaulde.utils.cookies.del('myCookie', {path: '/somedir'});`
    * deletes a cookie by the name of 'myCookie' which had been set with a path of '/somedir'
  * `jaaulde.utils.cookies.del(true);`
    * deletes all cookies
  * A cookie can only be deleted using the same options with which it was set
  * **See information on options object below**


### Test if browser is accepting cookies ###
```
/**
 * test - test whether the browser is accepting cookies
 *
 * @access public
 * @return Boolean
 */
test = function()
```
#### Example: ####
  * `jaaulde.utils.cookies.test();`
    * attempts to set a cookie and returns true or false upon success or failure

### Set default options to use when none are specified ###
```
/**
 * setOptions - set default options for calls to cookie methods
 *
 * @access public
 * @param Object options - list of cookie options to specify
 * @return void
 */
setOptions = function(options)
```
#### Example: ####
  * `jaaulde.utils.cookies.setOptions({path: '/somedir'});`
    * all cookies will be set or deleted with the path , '/somedir', unless it is explicitly provided in a passed options object
  * **See information on options object below**

## With jQuery ##

If jQuery is available, then all of the [above methods](http://code.google.com/p/cookies/wiki/Documentation#Without_jQuery) are available to you under the _jQuery.cookies_ (or _$.cookies_ ) namespace:
  * `$.cookies.get()`
  * `$.cookies.filter()`
  * `$.cookies.set()`
  * `$.cookies.del()`
  * `$.cookies.test()`
  * `$.cookies.setOptions()`

In addition, there are some jQuery function additions for helping automate some cookie tasks:

  * **Set the value of a form field or the HTML of an element to a cookie named after the field's/element's name or id attribute**
    * `$('#username').cookify();`
      * The value of the field, or HTML of the element, with id "username" is set to a cookie named after the name or id attribute of that field/element. If a radio or checkbox and it's checked, the value will be set.

  * **Fill a field's value, or an element's innerHTML with the value of a cookie**
    * `$('#username').cookieFill();`
      * Set the value of the input, or HTML of the element, with id, 'username', to the value of a cookie by the same name.  If a radio or checkbox and it is checked, the cookie will be set.  If not checked, the cookie will be deleted.

  * **Bind an input to the cookies library**
    * `$('#username').cookieBind();`
      * Fills the field or element with id, 'username', with the cookie named the same and sets the field's/element's change event to fire cookify() to update the cookie when the input value changes

## Options object ##

Using the options object, cookies can be set with several options such as the domain and or path for which the cookie should be available, expiration date for the cookie, and whether the cookie should be sent over HTTPS only.

The options object has four properties:
  * **domain**
    * STRING
    * For which domain should the cookie be available
  * **path**
    * STRING
    * For which path should the cookie be available
  * **hoursToLive (DEPRECATED for expiresAt)**
    * NUMBER
    * For how many hours should the cookie be valid? (Passing 0 means to delete the cookie at the end of the browser session--this is default.  Negative values will delete the cookie, but you should use the del() method instead.)
  * **expiresAt**
    * Date OBJECT
    * Date object representing expiration date/time of cookie
  * **secure**
    * BOOL
    * Should cookie be sent to server via HTTPS _only_?

The structure of the object is as follows:

```
  var newOptions = {
    domain: '*.mydomain.com',
    path: '/somedir',
    expiresAt: new Date( 2011, 1, 1 ),
    secure: true
  }
```

You need only set those options which you desire to override.

The default options when not overridden are:
  * **domain**
    * no value - will cause current domain of current page to be used
  * **path**
    * /
  * **expiration**
    * no value--causes cookie to be deleted at end of browser session
  * **secure** (send over HTTPS only)
    * false

An options object can be passed with `set()`, `del()`, `cookify()`, and `cookieBind()` to override the defaults on a case by case basis.  You can also pass an options object to `setOptions()` to override the defaults for all calls.

**IMPORTANT NOTE:** Cookies must be deleted using the same domain and path options with which they were set.  Else the cookie will not delete.  This is just how cookies work.