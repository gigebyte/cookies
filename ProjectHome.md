# Javascript Cookie Library with jQuery bindings and JSON support #

## Current Version: _2.2.0_ ##
## Released: _06 Jan 10_ ##

### Features ###
  * [Use without jQuery](http://code.google.com/p/cookies/wiki/Documentation#Without_jQuery)
    * The core of this library--cookie manipulation--does not require jQuery.  You can use it standalone to manipulate HTTP cookies.
  * [Use with jQuery](http://code.google.com/p/cookies/wiki/Documentation#With_jQuery)
    * With jQuery present, the lib is added to the jQuery namespace along with jQ extension methods to bind cookies to form values and html elements.
  * [JSON support](http://code.google.com/p/cookies/wiki/JSON): set ANY value to a cookie
    * When the standard [JSON API](http://code.google.com/p/cookies/wiki/JSON) is available, all value types can be set as a cookie.  The value will be JSON encoded on set, and decoded on get.

### Description ###
This is a Javascript library for accessing and manipulating HTTP cookies in the web browser. You can get one or a list of cookies, set cookies, delete cookies, test if the browser accepts cookies.  When JSON support is available, any JS value can be set to a cookie--it will be automatically serialized before being written to the cookie.  **jQuery is not required to use this library**, but jQuery bindings are available when jQuery is present on the page.  When jQuery is available, you can cause form fields to automatically set cookies, or auto fill form fields with cookie values.  See the [documentation](http://code.google.com/p/cookies/wiki/Documentation) for details.

### Basic usage ###
Shown here are some of the most basic usages.  See the [documentation](http://code.google.com/p/cookies/wiki/Documentation) for customization options and specifics.
```
//set
$.cookies.set( 'sessid', 'dh3tr62fghe' ); //A cookie by the name 'sessid' now exists with the value 'dh3tr62fghe'

//get
var sessid = $.cookies.get( 'sessid' ); //Variable 'sessid' now holds the value 'dh3tr62fghe'

//delete
$.cookies.del( 'sessid' ); //The cookie named 'sessid' has been deleted.

//test
if( $.cookies.test() )
{
  //browser is accepting cookies
}


//JSON
var jimData = {id: 1, name: 'jim'};
$.cookies.set( 'userdata', jimData ); //A cookie by the name 'userdata' now exists with a serialized copy of jimData

var userData = $.cookies.get( 'userdata' ); //A variable named 'userData' now holds the unserialized object--should be identical to the variable 'jimData'


//jQuery Extensions
$( 'input.store' ).cookify(); //Inputs with class of 'store' are written to a cookie named after the input

$( 'input.store' ).cookieFill(); //Inputs with class of 'store' are filled with the value of cookies with matching names

$( 'input.store' ).cookieBind(); //Inputs with class of 'store' are filled with the value of cookies with matching names and whenever they change the cookie will be updated
```