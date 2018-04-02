package tech.spaceoso.jobboard.webIntegration;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import tech.spaceoso.jobboard.App;
import tech.spaceoso.jobboard.model.Address;
import tech.spaceoso.jobboard.model.Job;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
@WebAppConfiguration
public class JobControllerWebIntegrationTest {

    @Test
    public void testListAll() throws IOException {

        TestRestTemplate restTemplate = new TestRestTemplate();

        ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8080/api/v1/jobposts/list", String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);

        List<Job> newJobs = Arrays.asList(objectMapper.readValue(response.getBody(), Job[].class));

        // check that every element is a Job
        assertThat(newJobs, everyItem(isA(Job.class)));
        // check that every address object inside the Job is an Address
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", isA(Address.class))));
        // TODO need to implement a check for an company

        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("title", isA(String.class))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("id", isA(UUID.class))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("description", isA(String.class))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("street", isA(String.class)))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("city", isA(String.class)))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("state", isA(String.class)))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("zipCode", isA(Integer.class)))));
    }

}
