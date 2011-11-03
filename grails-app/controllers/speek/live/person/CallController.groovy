package speek.live.person

class CallController {

    def index = { }
    def apiKey = "zekvzycwyyej9ns4p5vujhqt"
    def voxeoNumber= "14087586688"
    def dummyNumber=  "14087586687"
 //    def dummyNumber= "johnlabarge@sip2sip.info"
    def participantNumber = "16502833450"

    //def eavesDrop = null
    String eavesDrop = "16502833450"
    def callService



    def startCall = {


        def number = (params.who? params.who: participantNumber)

       def theCall = callService.startCall(number,eavesDrop);

        //render view
    }

    def badRequest = {
       sendError("401", "HTTP Method not supported at this endpoint.")
   }

   def startVXML2LivePersonSession = {

       callService.initializeCallSession();


       session.setAttribute("chatSessionId",callService.callChatSessionId);
       session.setAttribute("audioSessionId",callService.callAudioSessionId);

       forward(controller: "vxml", action:"start");
   }



  def userResponse = {

      params.voiceMessage = params.userResponse +  audioURLService.nextAudioLink()

      forward(controller:"chat", action:"sendVoiceMessage");

  }


}