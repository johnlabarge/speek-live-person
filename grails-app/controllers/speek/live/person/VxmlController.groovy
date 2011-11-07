package speek.live.person

class VxmlController
{

    def sessionService
    def chatService

    def index = { }


    def start = {

       log.info params
       def callerid = params.session.sessionid
       session.setAttribute("callerId", callerid)
       sessionService.newSession(callerid, ["callerid":params.session.sessionid, "ivrSessionId":params.session.sessionid, "ivrParentSessionId":params.session.parentsessionid, "ivrCalledId":params.session.calledid]);
       if (!sessionService.livePersonAgentAvailable(callerid)) {
         render (view:"/vxml/agentUnavailable");
       }
       [callerid: session.getAttribute("callerId")]
    }

    def chatAndYesNo =  {

        log.info params
        render ( view:"/vxml/yesNo" );
    }

    def hold = {

      [callerid: session.getAttribute("callerId")];

    }

    def first = {
        log.info "......../vxml/first..."
        log.info params


        [message : "starting chat session, please wait"];
    }

    def voice = {
        log.info "in voice capture:${params.voiceCapture}\n"
        def usersMeaning = params.voiceCapture;
        chatService.deliverVoiceMessage(sessionService.getChatSessionId(params.callerid),usersMeaning)
        forward(controller:'vxml', action:'hold')
    }

    def chatResponse = {

        log.info ".../vxml/chatResponse......\n"
        String message = request.getAttribute("chatMessages");
        log.info message
        [message: message, callerid : session.getAttribute("callerId")];
    }

}
