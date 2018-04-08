package tech.spaceoso.jobboard.controller;

public class AuthExceptions extends Exception {
    public AuthExceptions() {super();}

    public AuthExceptions(String message){
        super(message);
    }

    public AuthExceptions(String message, Throwable cause) {
        super(message, cause);
    }
}
