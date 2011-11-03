<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 10/22/11
  Time: 9:00 AM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
  <head>
      <meta name="layout" content="main"/>
      <r:require modules="backbone"/>
  </head>

       <heading>
           <h1>The grammar editor</h1>
       </heading>
       <body class="editor">
        <h1 class="grammarEditorTitle"> Grammar Editor</h1>
        <div id="grammarEditor" class="grammarEditor">





        </div>



       <script type="text/template" id="meaning-view">
           <div class="meaning">
               <div class="meaningHeader">
                   <div class="meaning-content-input">
                       The following spoken phrases are written as: <br/> <span
                           class="meaning-content meaningText"><%=text%></span> <span
                           class="deleteMeaning meaningDelete"></span>

                   </div>
                </div>
               <div class="phrases">
               </div>
               <div class="newPhrase newPhrasePanel">
                           <input class="new-phrase-input" type="text"/>
                           <button class="new-phrase">Add Phrase</button>
                       </div>
           </div>
       </div>
       </script>
<script type="text/template" id="phrase-view">
   <div class="phrase">
     <div class="phrase_text"><%= text%></div>
     <div class="phrase_destroy"></div>
   </div>
 </script>
<script type="text/template" id="newMeaning">
    <div class="newMeaningPanel">
    <input type="text" class="newMeaningInput"/>
    <button class="new-meaning">new meaning</button>
    </div>
 </script>
  <coffee:js name="grammar"/>
</body>


</html>