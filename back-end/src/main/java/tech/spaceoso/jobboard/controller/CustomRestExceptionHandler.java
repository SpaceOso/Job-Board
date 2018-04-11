package tech.spaceoso.jobboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tech.spaceoso.jobboard.exception.ResourceNotFoundException;


@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {

//    @Autowired
//    ApiError apiError;

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Object> handleNotFoundException(ResourceNotFoundException exception) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, exception.getMessage(), "Error yo");
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
