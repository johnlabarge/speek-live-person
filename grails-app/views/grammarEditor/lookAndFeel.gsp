<%--
  Created by IntelliJ IDEA.
  User: john
  Date: 11/2/11
  Time: 1:06 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
  <head>
      <meta name="layout" content="main"/>
  </head>
  <body>
  <div id="grammarEditor" class="grammarEditor">
           <input type="text" class="newMeaningInput"/>
    <button class="new-meaning">new meaning</button>
      </div>
           <div class="meaning">
               <div class="meaning-wrap">
                   <div class="meaning-content-input"><span class="meaning-content meaningText">some meaning</span>
                       <input type="text" class="meaning-input">
                   </div>

                   <div class="deleteMeaning meaningDelete"></div>
               </div>

               <div class="newPhrase">
                   <input class="new-phrase-input" type="text"/>
                   <button class="new-phrase">Add Phrase</button>
               </div>

               <div class="phrases">
                   Phrases:
                   <div class="phrase">
                        <div class="phrase_text">phrase one</div>
                        <div class="phrase_destroy"></div>
                        <div class="phrase_text">phrase two</div>
                        <div class="phrase_destroy"></div>
                   </div>
               </div>
           </div>
       </div>
    </body>
</html>