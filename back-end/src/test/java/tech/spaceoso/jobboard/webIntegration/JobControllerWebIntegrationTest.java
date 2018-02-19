package tech.spaceoso.jobboard.webIntegration;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.hamcrest.Matcher;
import org.hamcrest.Matchers;
import org.hamcrest.core.Every;
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

        Job[] jobs = objectMapper.readValue(response.getBody(), Job[].class);


        List<Job> newJobs = Arrays.asList(jobs);
        Job testerJob = new Job(UUID.randomUUID(), "hello!", new Address("3434", "sdfsadf", "asldkjf", 1234), "yo yo yo",3L);

        System.out.println("single job: " + testerJob);
        assertThat(testerJob, hasProperty("title"));
        assertThat(newJobs.get(0).getAddress(), isA(Address.class));
        assertThat(newJobs, everyItem(isA(Job.class)));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", isA(Address.class))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("title")));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("id")));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("description")));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address")));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("street"))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("city"))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("state"))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("address", hasProperty("zipCode"))));
        assertThat(newJobs, everyItem(Matchers.<Job>hasProperty("employerId")));
//        assertThat(newJobs, Matchers.<Job>hasItem(Matchers.<Job>hasProperty("title")));
    }

}
