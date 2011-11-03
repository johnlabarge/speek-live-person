

class UrlMappings {

	/*static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
	}*/

    static mappings = {
       "/$controller/$action?/$id?" { constraints { } }


        "/meaning/$id?" (controller:"meaning", parseRequest:true) {
            action = [GET:"list", PUT:"update", DELETE:"delete", POST:"create"]
        }
        "/phrase/$id"  (controller:"phrase", parseRequest:true) { action = [GET: "list", PUT:"update", DELETE:"delete", POST:"create"]}


        "/call/$who?" (controller:"call", action:"startCall")
        "/createchatsession" (controller:"chat", action:"createChatSession")
        "/sendvoicemessage" (controller:"chat", action:"sendVoiceMessage")
        "/deliverchatmessage" (controller:"chat", action:"deliverChatMessages")
        "/closechatsession"  (controller:"chat", action:"closeChatSession")
        "/vxml/start" (controller: "vxml", action:"start")
        "/callMe/demo" (controller: "callMe", action:"demo")
        "/callMe/start/$phoneNumber?" (controller:"callMe", action:"start")
         "/vxml/$action" (controller:"vxml")
        "/"(view:"/index")


    }





}
