package speek.live.person

import grails.converters.JSON

class CallService
{

    static transactional = false;
    static scope = "session"

    def apiKey = "zekvzycwyyej9ns4p5vujhqt"
       def voxeoNumber= "14087586688"
       def dummyNumber=  "14087586687"
    //    def dummyNumber= "johnlabarge@sip2sip.info"
       def participantNumber = "16502833450"


    def chatService
    def sessionService
    def theSpeekCall = null;
    def theIVRCall = null;

    def callChatSessionId;
    def callAudioSessionId;

    def outboundToken;

    Object startCall  (String number, String eavesDrop)  {

       log.info("Starting call to phoneNumber: ${number}");

       def theCall = startSpeekCall(number, eavesDrop);


       return theCall;
    }


    def endCall = {

       log.info "endCall is noop for now"
    }

    def startSpeekCall = { number, eavesDrop ->
         def eaves = (eavesDrop ? ",${eavesDrop}" : "")
         println "starting speek call..."
         def speekUrl = "http://api.speek.com/calls/callNow"
         def urlparams="?api_key=${apiKey}&format=json&description=vxmlcall&call_name=vxmlcall"
         urlparams+="&recording=0&exit_on_leave=1&sound_on_inout=1&numbers=${voxeoNumber},${number}${eaves}"
         speekUrl+=urlparams;
         println "using speek url: ${speekUrl}"
         def jsonText = speekUrl.toURL().text;
         println jsonText
         return JSON.parse(jsonText)
    };


    def waitForConnectionByParticipant = {  aCall, aParticipant->
        println "polling participant status until active"
        def callId = aCall.results.call_id
        boolean stillWaiting = true;
        def participantCheckUrl = "http://api.speek.com/calls/getParticipantStatus?api_key=${apiKey}&format=json&call_id=${callId}"

        def checkURL = participantCheckUrl.toURL();
        while (stillWaiting)  {
           println "checking participant status .... "
           def participantStatus = JSON.parse(checkURL.text);
           println participantStatus

           def thisParticipantsStatus = findParticipantStatusFromParticipantsStatusReturn(participantStatus,aParticipant);

           println("status of ${aParticipant} = ${thisParticipantsStatus}")
           stillWaiting = (thisParticipantsStatus.equals("not-active"));
           if (stillWaiting) {
              Thread.sleep(4000)
           }

        }

   }
   def addParticipant = { theCallStatus ->
       println "add participant..."
       println "call status = ${theCallStatus}"
       if (theCallStatus.ok.equals("1"))  {

          def callId = theCallStatus.results.call_id
          println callId
          def addParticipantUrl =  "http://api.speek.com/calls/addParticipant?api_key=${apiKey}s&call_id=${callId}&numbers=${voxeoNumber}&format=json"
          println "addParticipantUrl="+addParticipantUrl
           return JSON.parse(addParticipantUrl.toURL().text)
       }

   }

   def findParticipantStatusFromParticipantsStatusReturn = { participantStatus, participantNumber ->

          List participants = participantStatus.results.participants;
         def theReturn = "non-active"
          participants.each {
              println it
              println "\n\n"
              println "participant number =  ${it.number}"
              println "active ${it.active}"
              if (it.number.equals(participantNumber)) {
                 println("found number .... ")
                 theReturn =  (it.active.equals("1") ? "active": "not-active");
              }
          }
          return theReturn

    }

    /*
     *  just hardcode this activity for now.
     */
    def initializeCallSession =  {
          callChatSessionId = chatService.createChatSession();
          callAudioSessionId  = generateAudioSessionIdForChatSession(callChatSessionId);
          sessionService.setChatSessionForAudioSessionId(callChatSessionId,callAudioSessionId)

          def voxeoOutboundURL = "http://api.voxeo.net/SessionControl/VoiceXML.start&numbertodial=${theCall.phoneNumber}&tokenId=${outboundToken}&callerid=${callAudioSessionId}"
          log.info "starting voxeo outbound call"
          def voxeoReturn = voxeoOutboundURL.toURL().text;
          log.info  "voxeo returned: \n ${voxeoReturn}"

    }


}
