$(document).ready(function () {

    console.log('Divesite page ready');

    //var queryURL = "https://api.divesites.com/?mode=detail&siteid=17559"
    //var wikipedia = "&titles=vortex_spring"
    var diveURL = "https://en.wikipedia.org/w/api.php?action=query&titles=vortex_spring&prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=q";
    // 28.5383° N, 81.3792° W
    // http://api.divesites.com/?mode=sites&lat=47.6031537682643&lng=-122.336164712906&dist=25https://en.wikipedia.org/w/api.php?action=query&titles=blue+whale&prop=revisions&rvprop=content&format=json&origin=*&gsrsearch=q

    $.ajax({
        url: diveURL,
        method: "GET"
    })
        .done(function(diveresponse) {
            console.log('diveresponse', diveresponse);
            console.log('divesite ready');

        }); //End .done function

}); //End Document.ready