(function()
{
    var aliases = (typeof pearlaliases !== "undefined") ? pearlaliases : {};

    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object')
    {
        // CommonJS/Node.js
        module.exports[aliases["lambda"] || "lambda" ] = lambda;
    }
    else if (typeof define === 'function' && define['amd']) 
    {
        // AMD anonymous module (require.js, e.g.)
        var tmp = {};

        tmp[aliases["lambda"] || "lambda"] = lambda;

        define(tmp);
    } 
    else 
    {
        // no loader - global via script tag
        var g = this || (0, eval)('this');

        g[aliases["lambda"] || "lambda" ] = lambda;
    }

    function lambda(l)
    {
        function _parse(ll)
        {
            // separate parameters from body
            var matches = /(?:\(([^\)]*)\)|([a-z_]\w*))\s*=>(.*)/i.exec(ll);

            if (!matches) return null;
            // drop unneeded full match
            if ( matches.length > 0 ) matches.shift();

            var p = [];
            // if matched multiple parameter/parenthesized style
            if (typeof matches[0] != "undefined")
            {
                // extract parameters
                var re = /[a-z_]\w*/ig;
                var match;

                while (match = re.exec(matches[0]))
                    // save parameter
                    p.push(match[0]);
            }
            // if matched non-parenthesized style
            else if (typeof matches[1] != "undefined" && matches[1] != "")
            // save single parameter
                p.push(matches[1]);
            else // no match - syntax error in lambda
                return null;

            var b = matches.pop(); // extract the body text

            // is it another lambda?
            var inner = _parse(b);

            if (inner != null && inner.length > 0)
            {
                var b2 = inner.pop();
                b = "function(" + inner.join(",") + "){" + b2 +  "}";
            }
            // if simple expression and not a code block,
            // prepend a return if not already there.
            if (! /^\s*\{(.*)\}\s*$/.test(b) && ! /^\s*return\s+/.test( b ))
                b = "return " + b ;

            // save body
            p.push(b);

            return p;
        }

        var f = _parse(l);

        if (f == null || f.length < 1) return null;

        // try to create a javascript function from parameters and block
        try
        {
            return Function.apply( null, f );
        }
        catch(e)
        {
            return null ;
        }
    }
})();
    




