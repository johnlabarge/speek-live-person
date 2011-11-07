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
        def meaning
        def text = text(params)
        if (validate(text)) {
            try {
                meaning = new Meaning(text:params.text);
                meaning.save();
            } catch (Exception e) {
                log.info e;
            }
            def trimmed = ['id':meaning.id, 'text':meaning.text]
            render trimmed as JSON
        } else {
          response.sendError(400)
        }
    }


    def update = {
        def meaning
        render trimmed as JSON
    }

    def delete = {

        Meaning meaning = Meaning.get(params.id);
        meaning?.delete();

    }

    def text = { params -> return params.text}
    def validate = { toCheck ->  return (toCheck && toCheck.trim().length()>0) }
}
