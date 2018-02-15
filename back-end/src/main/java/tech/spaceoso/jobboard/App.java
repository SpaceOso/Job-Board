package tech.spaceoso.jobboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import tech.spaceoso.jobboard.repository.UserRepository;

/**
 * Hello world!
 */
@SpringBootApplication
@EnableConfigurationProperties
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}
