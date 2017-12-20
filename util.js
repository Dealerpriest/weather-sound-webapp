//get the value of the requested key in the querystring
//if the key does not exist in the query string, returns the empty string
exports.gup = function ( key, url ) {
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+key+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
      return "";
    else
      return results[1];
  };