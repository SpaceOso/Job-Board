package tech.spaceoso.jobboard.service;

import org.json.JSONObject;

public final class JsonObjectCreator {

    private JsonObjectCreator(){}


    /**
     * A handy JSON object creator.
     * @param messageKey    the key to obtain the message
     * @param messageValue  the value of the message
     * @return              JSON object stringified
     */
    public static JSONObject createSingleMessageObject(String messageKey, String messageValue){
        // create json object
        JSONObject messageObject = new JSONObject();
        // place message inside
        messageObject.put(messageKey, messageValue);
        // return message
        return messageObject;
    }
}
