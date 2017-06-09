$(document).ready(function ($) {

console.log('readyEbay!');

$.ajax( {
    url : "https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=DSCNS2cf4-34a4-4921-a079-6b7239ba862&siteid=0&version=515&ItemID=331633600730&IncludeSelector=ShippingCosts&callbackname=jsonpcallback", 
    type: "GET",

 }).done(function(response) {
    console.log('readyEbayAjax!');
    console.log('response', response);
 
 }); // .done


function _cb_findItemsByKeywords(root) {
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var html = [];
    html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
    for (var i = 0; i < items.length; ++i) {
        var item     = items[i];
        var title    = item.title;
        var pic      = item.galleryURL;
        var viewitem = item.viewItemURL;
        if (null != title && null != viewitem) {
            html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
                '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
        }
    }
    html.push('</tbody></table>');
    document.getElementById("ebayResults").innerHTML = html.join("");
}  // End _cb_findItemsByKeywords() function
// Create a JavaScript array of the item filters you want to use in your request
var filterarray = [
    {"name":"MaxPrice",
        "value":"25",
        "paramName":"Currency",
        "paramValue":"USD"},
    {"name":"FreeShippingOnly",
        "value":"true",
        "paramName":"",
        "paramValue":""},
    {"name":"ListingType",
        "value":["AuctionWithBIN", "FixedPrice"],
        "paramName":"",
        "paramValue":""},
];
// Define global variable for the URL filter
var urlfilter = "";

// Generates an indexed URL snippet from the array of item filters
function  buildURLArray() {
    // Iterate through each filter in the array
    for(var i=0; i<filterarray.length; i++) {
        //Index each item filter in filterarray
        var itemfilter = filterarray[i];
        // Iterate through each parameter in each item filter
        for(var index in itemfilter) {
            // Check to see if the paramter has a value (some don't)
            if (itemfilter[index] !== "") {
                if (itemfilter[index] instanceof Array) {
                    for(var r=0; r<itemfilter[index].length; r++) {
                        var value = itemfilter[index][r];
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
                    }
                }
                else {
                    urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
            }
        }
    }
}  // End buildURLArray() function

// Execute the function to build the URL filter
buildURLArray(filterarray);

// Construct the request
// Replace MyAppID with your Production AppID
var url = "http://svcs.ebay.com/services/search/FindingService/v1";
url += "?OPERATION-NAME=findItemsByKeywords";
url += "&SERVICE-VERSION=1.0.0";
url += "&SECURITY-APPNAME=MatthewT-UCFCodin-PRD-47a96b09a-bf1d6db0";
url += "&GLOBAL-ID=EBAY-US";
url += "&RESPONSE-DATA-FORMAT=JSON";
url += "&callback=_cb_findItemsByKeywords";
url += "&REST-PAYLOAD";
url += "&keywords=SCUBA" ;
// url += "&keywords=scuba%diving%fins";
// url += "&keywords=scuba%diving%buoyancy%compensators";
url += "&paginationInput.entriesPerPage=3";
url += urlfilter;


// Submit the request
s=document.createElement('#ebayResults'); // create script element
s.src= url;
document.body.appendChild(s);

}); // end document.ready