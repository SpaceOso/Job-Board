package tech.spaceoso.jobboard.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import tech.spaceoso.jobboard.repository.EmployeeRepository;

import javax.persistence.EntityManager;

@RunWith(SpringJUnit4ClassRunner.class)
public class AuthControllerTest {
    
    @Mock
    EntityManager em;
    @Mock
    EmployeeRepository employeeRepository;
    
    @InjectMocks
    AuthController authController;
    
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }
    
    @Test
    public void TestAuthOnLoad() throws Exception{
        // receives a token string
    }
}
