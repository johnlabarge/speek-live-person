package com.speek.chat

/**
 * Created by IntelliJ IDEA.
 * User: john
 * Date: 9/17/11
 * Time: 11:05 AM
 * To change this template use File | Settings | File Templates.
 */
class NonExistentChatSessionException extends Exception {

    String sessionId

    public NonExistentChatSessionException(String message)
    {
       super(message);
    }
}
