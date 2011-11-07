package speek.live.person
import com.liveperson.api.chat.*
import com.speek.chat.*;

class ChatService {

    static transactional = false

    def LPAPIKEY = "f50109a897f649618d5d807460d2865c"
    def LPACCOUNT= "P58910725"
    def CHAT_TIMEOUT = 30;


    static def chatSessions = [:]
    static def firstMessages = [:]

    public String createChatSession()
    {
        String chatSessionId = null;
        def chatAPI = new ChatAPIWrapper(LPAPIKEY,LPACCOUNT);
        chatAPI.initRequests(LPACCOUNT)
        chatSessionId = UUID.randomUUID().toString();
        chatSessions.put(chatSessionId,chatAPI);
        chatAPI.startChat();
        firstMessages.chatAPI = [:];
        firstMessages.chatAPI."toRemove"=4;
        return chatSessionId;
    }

    public String deliverChatMessages(String chatSessionId) throws NonExistentChatSessionException
    {
        String chatMessages = new StringBuffer();
        ChatAPIWrapper chatAPI = getChatAPI(chatSessionId, "delivering chat messages")
        waitForInChat(chatAPI);
        if (firstMessages.chatAPI."toRemove" > 0)
           chatMessages =  deliverFirstMessages(chatAPI);
        else
            chatMessages = deliverMessages(chatAPI);

        return chatMessages;
    }

    public void deliverVoiceMessage(String chatSessionId, String voiceMessage)
    {
        ChatAPIWrapper chatAPI = getChatAPI(chatSessionId, "sending a voice message");
        waitForInChat(chatAPI);
        chatAPI.sendMessage(voiceMessage);
        skipSentMessage(chatSessionId)
    }

    public void closeChatSession(String chatSessionId)
    {
        ChatAPIWrapper chatAPI = getChatAPI(chatSessionId, "closing chat session");
        chatAPI.terminateChat();
        chatSessions.remove(chatSessionId);

    }

    private String deliverMessages(ChatAPIWrapper chatAPI)
    {
        log.info "deliverMessages"
        StringBuffer chatMessages = new StringBuffer();
        List<ChatMessage> messages = chatAPI.getNewMessages(false);
        messages.each { chatMessages.append(it.message).append(" ") }
        return chatMessages.toString()
    }

    private String deliverFirstMessages (ChatAPIWrapper chatAPI)
    {
        log.info "deliverFirstMessages()"
        String message = null;

        StringBuffer chatMessages = new StringBuffer();
        List<ChatMessage> messages = chatAPI.getNewMessages(false);
        if ((messages != null) && messages.size() > 0)
        {

            log.info "removing first four boiler plate messages because we don't want them to be spoken: "
            int removed;
            while (messages.size() > 0 && firstMessages.chatAPI."toRemove" > 0)
            {
                messages.remove(0)
                firstMessages.chatAPI."toRemove"--;
            }
            if (firstMessages.chatAPI."toRemove" == 0) {
                messages.each {chatMessages.append(it.message).append(" ")}
                firstMessages.remove(chatAPI);
                message = chatMessages.toString();
            }
        }

        return message;
    }

    private ChatAPIWrapper getChatAPI(String chatSessionId, String why) throws NonExistentChatSessionException
    {
        ChatAPIWrapper ret = chatSessions.get(chatSessionId);
        if (ret == null)  {
           log.info "no chat session found:"+chatSessions
           throw new NonExistentChatSessionException("attempt to use nonexistent chat session: ${chatSessionId} for ${why}")
        }
        return ret;
    }

    private void waitForInChat(ChatAPIWrapper chatAPI) {

         for (int i=0; i < CHAT_TIMEOUT; i++) {
             if (!chatAPI.isInChat())
                 Thread.sleep(1000);
             else
                 break;
         }

         if (!chatAPI.isInChat()) {
             throw new TimeoutWaitingForChatException("Waited ${CHAT_TIMEOUT} seconds for chat to start, but it didn't!");
         }
    }

    private void skipSentMessage(sessionid) {

        ChatAPIWrapper chatAPI = chatSessions.get(sessionid)
        chatAPI.getNewMessages(false);

    }

}
