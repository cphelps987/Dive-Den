/*$(document).ready(function () {*/

console.log("flickr ready!")

//var flickrLoopUp= diveResults.sites[1].name;
/*$.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba,"+ flickrLoopUp +"&format=json&nojsoncallback=1", function(data){*/

$.getJSON("https://cors-bcs.herokuapp.com/https://api.flickr.com/services/feeds/photos_public.gne?tags=florida,scuba&format=json&nojsoncallback=1", function(data){
    $.each(data.items, function(i,item){
        $("<img>").attr("src", item.media.m).appendTo("#flickrImg")
          //  .wrap("<a href='" + item.link + "'></a>");
    });

});


//    Secret sauce:         https://cors-bcs.herokuapp.com/




//     use D3 to make things look awesome 


/*});*/

