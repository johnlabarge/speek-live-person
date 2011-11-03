<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 10/2/11
  Time: 11:42 AM
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="layout" content="main"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />


<title>Speak to Liveperson demo</title>
<style type="text/css">
#buttonDiv {
	position:relative;
	width:300px;
	height:80px;
	z-index:1;
	border-color: #09F;
    border-width:medium;
	border-bottom:outset;
	border-top-left-radius:2px;
	border-top:inset;
	border-left:outset;
	border-right:outset;
    background-color:#FFCC88;


}
#inputDiv {
	position:relative;
    left 20px;
    width: 100px;
    height:50px;

}
#labelDiv {
    top: 20px;
	position:relative;
    height:50px;
}
#phonenumberInput {
    top:0px;
    left:10px;
    position:relative;
    font-family: "Courier New", Courier, monospace;
    font-size:20pt;
    width:200px;
    height:22px;
}
#callMe {
    font-family: "Courier New", Courier, monospace;
    font-size: 20pt;
    position:relative;
    left:5px;
}

#bodyDiv {
     position: absolute;
     top:150px;
     left:200px;
     width:400;
     height:300;
}
</style>

</head>

<body>
<div id="bodyDiv">
    <div id="buttonDiv">
        <span id="callMe">Please call me:</span>

        <div id="inputDiv">
            <input type="text" id="phonenumberInput">
        </div>
    </div>
</div>
    <g:javascript>

        function getPhonenumberText () {

             text = $("#phonenumberInput").val();
             if (text.search(/^\d{10}$/) == -1 &&  text.search(/^\d{3}-\d{3}-\d{4}$/) == -1) {
                text = null;
             }
             return text;
        }
    $("#buttonDiv").click( function(event) {

                                           text = getPhonenumberText();
                                           if (text)
                                             alert("this should call the user at:"+text);

                           }
                         );

    $("#buttonDiv").mousedown ( function(event) {

                                           $(this).css("background-color","gray")
                                }
                              );
    $("#buttonDiv").mouseup( function(event) {

                                   $(this).css("background-color","#FFCC88")
                            });

    $("#buttonDiv").mouseover( function(event) { })
    $("#phonenumberInput").mousedown ( function(event) { event.stopPropagation()});
    $("#phonenumberInput").mouseup (function (event) { event.stopPropagation()});
    $("#phonenumberInput").click(function(event) {event.stopPropagation()});


    </g:javascript>
</body>
</html>
