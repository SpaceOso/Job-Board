package tech.spaceoso.jobboard;

import org.junit.Test;
import tech.spaceoso.jobboard.controller.HomeController;

import static junit.framework.Assert.assertEquals;

public class AppTest {

    @Test
    public void testApp() {
        HomeController homeController = new HomeController();
        String result = homeController.loadHome();
        assertEquals(result, "Welcome to the job board api!");
    }
}
