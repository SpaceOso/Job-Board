package tech.spaceoso.jobboard.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tech.spaceoso.jobboard.exception.ResourceNotFoundException;



@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(ResourceNotFoundException exception, WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, "Email or password are invalid. Please try again.", "bad-error");
        return new ResponseEntity<Object>(apiError, apiError.getStatus());
    }
}
