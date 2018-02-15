package tech.spaceoso.jobboard.repository;

import org.springframework.data.repository.CrudRepository;
import tech.spaceoso.jobboard.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLastName(String lastName);
}
