package speek.live.person

import grails.converters.XML

class ChatController
{

    def index = { }

    ChatService chatService
    def sessionService

    def createChatSession = {
       String chatSessionId = chatService.createChatSession()
       def retObj = ["chatSessionId":chatSessionId];
       session.setAttribute("chatSessionId":chatSessionId);
       render retObj as XML
    }

    def sendVoiceMessage = {
         String chatSessionId = params.get("chatSessionId")
         String message = params.get("voiceMessage")
         chatService.deliverVoiceMessage(chatSessionId,message)
         def retObj= ["sent":message]
         forward(controller:"chat", action:"deliverChatMessages");
    }

    def deliverChatMessages = {
         String chatSessionId = sessionService.getChatSessionId(params.get("callerid"));


         String messages = chatService.deliverChatMessages(chatSessionId)
         if ( (messages !=null)  && (messages.size() > 0) ) {
             request.setAttribute("chatMessages", messages)
             forward(controller: "vxml", action:"chatResponse")
         } else {
             forward (controller: "vxml", action:"hold")
         }
    }

    def closeChatSession = {
        String chatSessionId = params.get("chatSessionId")
        chatService.closeChatSession(chatSessionId);
        def retObj = ["chatStatus" : "ended"];
        forward(controller: "vxml", action:"disconnect")
    }

}
