package tech.spaceoso.jobboard.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import tech.spaceoso.jobboard.App;
import tech.spaceoso.jobboard.model.Job;

import java.util.List;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.is;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = App.class)
public class JobRepositoryIntegrationTest {

    @Autowired
    JobRepository jobRepository;

    @Test
    public void findAll(){
        List<Job> jobs = jobRepository.findAll();
        assertThat(jobs.size(), is(greaterThanOrEqualTo(0)));
    }
}
