$(document).ready(function ($) {

console.log('readyEbay!');

$.ajax( {
    url : "https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=DSCNS2cf4-34a4-4921-a079-6b7239ba862&siteid=0&version=515&ItemID=331633600730&IncludeSelector=ShippingCosts&callbackname=jsonpcallback", 
    type: "GET",

 }).done(function(response) {
    console.log('readyEbayAjax!');
    console.log('response', response);
 
 }); // .done

}); // end document.ready
