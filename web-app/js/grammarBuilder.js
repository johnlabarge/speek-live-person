grammarBuilderModel = { };
grammarBuilderModel.meanings = [];



grammarBuilderModel.fetch() = function () {

   $.ajax({

             url:"/speek-live-person/phrase/meaning/list",
             success: function(data) {
                gramamrBuilderModel.meanings = data.meanings;
                grammarBuilderModel.updatedAll()
             },
             failure : function () {
                 alert("could not retrieve the grammar");
             }
   });


}

grammarBuilderModel.recent=[];
grammarBuilderModel.addRecent = function(recent) {
grammarBuilderModel.recent[recent.size++] = recent;
}


grammarBuilderModel.deleteMeaning(meaning) = function(meaning) {
        $.ajax({

             url:"/speek-live-person/meaning/delete",
             data: {meaningId: meaning},
             type: "DELETE",
             success: function(data) {
                 grammarBuilderModel.addRecent(data.meaningId+" meaning id deleted.");
             },

             failure : function () {
                 alert("could not retrieve the grammar");
             }
        });

}

grammarBuilderModel.addMeaning = function(meaningObj) {


        $.ajax({
            url:"/speek-live-person/meaning/add",
            data: meaningObj,
            type: "POST",

            success: function (data) {

                grammarBuilderModel.addMeaning(data.meaning);
                grammarBuilderModel.updateAll();
            },

            failure : function (data) {
                alert("could not add meaning");
            }
        });


}

grammarBuilderModel.addPhrase = function(phraseObj) {

     $.ajax({
            url:"/speek-live-person/phrase/add",
            data: phraseObj,
            type: "POST",

            success: function (data) {

                grammarBuilderModel.addPhrase(phraseObj);
                grammarBuilderModel.updateAll();
            },

            failure : function (data) {
                alert("could not add phrase");
            }
        });

}

grammarBuilderModel.deletePhrase = function(phraseObj) {

      $.ajax({
          url:"/speek-live-person/phrase/delete",
          data: phraseObj,
          type: "DELETE",

          success: function (data) {

              grammarBuilderModel.deletePhrase(phraseObj);
              grammarBuilderModel.updateAll();
          },

          failure: function(data) {
              alert ("could not delete phrase");
          }

      })


}

function meaningView(meaningObj) {

    var meaningAddress = "meaning"+meaningObj.id;

    var str = "<div id="+meaningAddress+">";
    for (phraseObj in meaningObj.phrases) {
          str+=phraseView(phraseObj)+"\n";

     }
    str+=deleteObj(meaning,meaningObj.id);

}

function phraseView(phraseObj) {

    var phraseAddress = "phrase"+phraseObj.id
    var str = "<div id="+phraseAddress+">"
    str+="<span class=\"phrase_text\"+" id="+phraseAddress+"_text"+">"+phraseObj.text"</span>"
    str+=deleteObj(phraseObj)


}

/*
function newMeaning() {
    var text = $("#newMeaningText").val();
    $.ajax({
          url: "/speek-live-person/phrase/newMeaning?meaningText="+text,
          success: function(data) { $("#meanings").newMeaning(data.id,data.text)}
   })
}


function deleteMeaning(meaningId) {
    $.ajax ( {
        url: "/speek-live-person/meaning/delete?meaningId="+meaningId,
        success: function() { $("#meaning"+meaningId).remove()}
    });
}
function deletePhrase(phraseId) {
   $.ajax ( {
       url: "/speek-live-person/phrase/deletePhrase?phraseId="+phraseId,
       success: function() { $("#phrase"+phraseId).remove()}
})

}
function newPhrase(meaningId) {
    var newPhraseElementId = "#meaning"+meaningId+"_newPhrase_text";
    var phraseText = $(newPhraseElementId).val();
    $.ajax( {
         url: "/speek-live-person/phrase/newPhrase?meaningId="+meaningId+"&phraseText="+phraseText,
         success: function(data) { $("#meaning"+meaningId).newPhrase(data.id,data.text)}

    })
}

function newPhrase

function newPhraseChunk(meaningId) {

    var chunk = "<tr> <td>\n <input id=\"meaning"+meaningId;
    chunk += ".newPhrase.text\"/>\n</td>";
    chunk += "<td><button id=\"meaning"+meaningId+".newPhrase\" onclick=\"newPhrase("+meaningId+")\"/></td></tr>";
    return chunk;

}


(function($) {
    $.fn.newMeaning = function(id,text) {
           var newMeaningChunk = "<tbody id=\"meaning"+id+"\" title=\""+text+"\">\n";
            newMeaningChunk += newPhraseChunk();
            newMeaningChunk += "</tbody>";
            this.append(newMeaningChunk);
    }
}) (jQuery);

(function($) {
    $.fn.newPhrase = function(id,text) {
        var phraseid = "phrase"+id;
        var phraseidText = phraseid+"text";
        var deletePhraseId = "delete"+phraseid;
        var phraseDeleteId = phraseid+"Delete";
        var deletePhrase = "deletePhrase("+id+")";
        var phraseChunk = "<tr id=\""+phraseid+"\">\n";
        phraseChunk += "<td id=\""+phraseidText+"\">"+text+"</td>\n"
        phraseChunk += "<td id=\""+phraseDeleteId+"\"> <button id=\""+deletePhraseId+"\" value=\"delete\" onclick=\""+deletePhrase+"\"/></td>\n</tr>";
        this.append(phraseChunk);

    }
}) (jQuery);
*/



