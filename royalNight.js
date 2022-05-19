const prompt = require("prompt");
prompt.start();
/**
 * 
 */
prompt.get(["space", "plan"], function(err, firstRes){
    const { space, plan } = firstRes;
    function spaceStrToArray (str) {
        return str.split(" ");
    }

});
