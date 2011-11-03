package speek.live.person

import com.speek.grammar.Meaning
import grails.converters.JSON

class MeaningController
{

    def index = { forward(controller:"meaning", action:"list")}
    def list =  {
        log.info "list"
        def trimmed = Meaning.list().collect([]) { ["id":it.id,"text":it.text]}
        log.info trimmed

        render trimmed as JSON;

    }


    def create = {
        log.info params;
        try {
            Meaning meaning = new Meaning(text:params.text);
            meaning.save();
        } catch (Exception e) {
           log.info e;
        }
        forward(controller:"meaning", action:"list")
    }

    def update = {
        try  {
            Meaning meaning = Meaning.get(parmas.id);
            if (!meaning) {
               forward (controller:"meaning", action:"create");
            }
        } catch (Exception e) {
            log.info e;
        }

    }

    def delete = {

        Meaning meaning = Meaning.get(params.id);
        meaning?.delete();

    }

}
