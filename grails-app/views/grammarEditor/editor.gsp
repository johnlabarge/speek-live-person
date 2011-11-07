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
      <link rel="stylesheet" href="${resource(dir: 'css', file: 'grammarEditor.css')}" type="text/css">
  </head>

       <body>
       <div class="grammarEditor">
           <div class="grammarEditorTitle">
               Speech Recognition Phrases
           </div>

           <div id="editor">
               <div id="meaningsPanel">
                   <div id="meaningsTitle">Meanings</div>

                   <div id="newMeaningPanel"></div>

                   <div id="meanings"></div>
               </div>

               <div id="phrasesPanel">
                   <div id="phrasesTitle">Phrases</div>

                   <div id="newPhrasePanel"></div>

                   <div id="phrases"></div>
               </div>
           </div>
       </div>

       <script type="text/template" id="meaning-header">
        <div id="header" class="header"> <!--phrases view-->
                       The following spoken phrases are written as: <br/> <span
                           class="meaning-content meaningText"><%=text%></span>
        </div>
       </script>
       <script type="text/template" id="meaningView">
               <span class="meaningText"> <%= text %></span>
               <div class="meaningEdit"></div>
               <div class="meaningDelete"><span class="meaningDelete">delete</span></div>
           <!-- end meaning -->
       </script>
       <script type="text/template" id="newPhrase">
         <textarea id="phraseEditor" class="phraseEditor"></textarea>
         <button class="addPhrase">add</button>

       </script>
       <script type="text/template" id="phraseView">
               <span class="phraseText"><%= text %></span>
               <div class="phraseEdit"></div>
               <div class="phraseDelete"></div>
      </script>

       <script type="text/template" id="newMeaning">
           <input class="meaningEditor" type="text"/>
       </script>
       <coffee:js name="grammar"/>
       </body>


</html>