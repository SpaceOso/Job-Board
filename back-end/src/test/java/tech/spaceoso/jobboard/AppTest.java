package tech.spaceoso.jobboard;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import tech.spaceoso.jobboard.controller.HomeController;

import static junit.framework.Assert.assertEquals;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class AppTest {

    @Test
    public void testApp() {
        HomeController homeController = new HomeController();
        String result = homeController.loadHome();
        assertEquals(result, "Welcome to the job board api!");
    }
}
