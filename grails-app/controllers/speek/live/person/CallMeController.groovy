package speek.live.person

class CallMeController
{

    def callService;

    def index ={}

    def start =  {
        log.info "start call to: "+params.phoneNumber
        def theCall = callService.startSpeekCall(params.phoneNumber);
        render("start")
    }

    def demo = {
        log.info "callMe:demo"
        log.info params
        render(view:"demo")
    }

    def endCall = {
      callService.endCall(params.phoneNumber);
    }
}
