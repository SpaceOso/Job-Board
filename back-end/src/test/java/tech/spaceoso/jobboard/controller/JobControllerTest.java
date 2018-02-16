package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

public class JobControllerTest {
    @InjectMocks
    JobController jobc;

    @Before
    public void init(){
        MockitoAnnotations.initMocks(this);
    }


}
