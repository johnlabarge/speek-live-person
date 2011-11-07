package speek.live.person

import com.speek.grammar.Phrase
import com.speek.grammar.Meaning
import grails.converters.JSON

class PhraseController
{


    def create = {
        def phrase
        def meaning
        String text =text(params)

        if (validate(text))
        {
            try
            {
                meaning = Meaning.get(params.id);
                text = params.text
                text = text.trim()
                log.info text.length()
                phrase = new Phrase(text: text)
                meaning.addToPhrases(phrase)
            } catch (Exception e)
            {
                log.info e;
                response.status = 400;
            }
            render phrase as JSON
        }

        else
        {

            response.sendError(400)

        }


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


   def deletePhrase = {
     def phrase = Phrase.get(params.phraseId);
     phrase.meaning.deletePhrase(phrase);
     def data = ["deletedPhrase": params.phraseId];
     render data as JSON
   }


   def get = {

      [meanings:Meaning.list()]

   }
   def editor = {

      [meanings:Meaning.list()]

   }

   def text = { params -> return params.text}
   def validate = { toCheck ->  return (toCheck && toCheck.trim().length()>0) }



}
