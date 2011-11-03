/**
 * Created by IntelliJ IDEA.
 * User: john
 * Date: 7/24/11
 * Time: 7:30 AM
 * To change this template use File | Settings | File Templates.
 */


function getCallDispatchServerUrl() { return "http://workproduct.from-va.com:8088/call/default"; }
$(document).ready(
    function()
    {
        $("#start-call-button").attachCallEvent();

    }

)

(function($) {
    $.fn.attachCallEvent = function() {
         statusJson = $.ajax(
                 {
                         url:getCallDispatchServerUrl,
                         global: false,
                         type: "GET",
                         async: false
                 }).responseText

                 $("#start-call-status").updateStaus(statusJson);
    }
}) (jQuery);



