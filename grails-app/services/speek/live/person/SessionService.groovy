package speek.live.person

class SessionService
{

    static transactional = true
    def chatService

    def sessions = [:]

    def serviceMethod()
    {

    }

    public void newSession(String callId, Map params) {


       sessions."${callId}" = params.clone();
       try {
           sessions."${callId}"."chatSession" =  chatService.createChatSession()
           livePersonAgentIsAvailable(callId);
       } catch (Exception e)  {
           log.info e;
           livePersonAgentUnavailable(callId);
       }
       log.info sessions
    }

    public String getChatSessionId(String callId) {
        def theId = sessions."${callId}"."chatSession";
        log.info "getChatSessionId : ${theId}"
        return theId;
    }

    public boolean livePersonAgentAvailable(String callId) {

        return Boolean.valueOf(sessions."${callId}"."livePersonAgentAvailable");

    }

    private void livePersonAgentUnavailable(String callId) {

        sessions."${callId}"."livePersonAgentAvailable" = Boolean.FALSE.toString();
    }

    private void livePersonAgentIsAvailable(String callId) {
        sessions."${callId}"."livePersonAgentAvailable" = Boolean.TRUE.toString();
    }

}
