package speek.live.person

import com.speek.grammar.Phrase
import com.speek.grammar.Meaning
import grails.converters.JSON

class PhraseController
{


    def create = {
        log.info(params)
        def phrase
        def meaning
        try {
            meaning = Meaning.get(params.id);
            phrase = new Phrase(text:params.text)
            meaning.addToPhrases(phrase)


        } catch (Exception e) {
           log.info e;
        }
        render phrase as JSON

    }

    def list = {

        Meaning meaning = Meaning.get(params.id);
        if (!meaning) {
            log.info "meaning not found"
        }

        def retPhrases = meaning.getPhrases().collect([]) {['id':it.id, 'text':it.text]}
        render retPhrases as JSON
    }

    def update = {

        Phrase phrase = Phrase.get(params.id)
        if (!phrase) {
           forward (controller:"phrase", action:"create")
        }  else {

           phrase.setText(params.text);
           forward (controller:"phrase", action:"list")
        }
    }

    def delete = {

        Phrase phrase = Phrase.get(params.id);
        phrase?.delete();
        forward (controller:"phrase", action:"list");
    }






   def showAjax = {

      def meanings = Meaning.list();
      [meanings: meanings];
   }


   def deleteMeaning = {
      def meaning = Meaning.get(params.meaningId);
      meaning.delete();
      render(view:"meaningsUpdated");
   }

   def deletePhrase = {
     def phrase = Phrase.get(params.phraseId);
     phrase.meaning.deletePhrase(phrase);
     def data = ["deletedPhrase": params.phraseId];
     render data as JSON
   }

   def addPhrase = {

       def meaning;
       if (params.meaningId > 0) {

            meaning = Meaning.get(params.meaningId);

       } else {

           meaning = new Meaning(text:params.meaningText);

       }
       meaning.addToPhrases(params.phraseText);
       meaning.save();
       render(view:"editorUpdated")
   }

   def get = {

      [meanings:Meaning.list()]

   }
   def editor = {

      [meanings:Meaning.list()]

   }

   def newMeaning = {
       log.info "CREATE NEW MEANING: ${params.meaningText}\n"
       def meaning = new Meaning(text:params.meaningText);
       meaning.save();
       Map data  = ["id":meaning.id, "text":meaning.text]
       render data as JSON;

   }

   def newPhrase = {
       log.info "ADD NEW PHRASE, ${params.phraseText} TO MEANING ${Meaning.get(params.meaningId).text}"
       def meaningId = params.meaningId
       def phraseText = params.phraseText

       def meaning = Meaning.get(meaningId);
       Phrase phrase = new Phrase(meaning:meaning, text:phraseText);
       phrase.save();
       meaning.addToPhrases(phrase);
       meaning.save();

       Map data = ["id":phrase.id, "text":phrase.text];
       render data as JSON;

   }


}
