
/**
 * Created by IntelliJ IDEA.
 * User: john
 * Date: 9/14/11
 * Time: 8:10 AM
 * To change this template use File | Settings | File Templates.
 */
class ChatMessageBox {


         List delivered = [];
         List waiting   = [];


        public deliverMessages() {


            waiting.each {
                deliver(message);
                delivered << message;
            }
            waiting.clear();

        }




}
