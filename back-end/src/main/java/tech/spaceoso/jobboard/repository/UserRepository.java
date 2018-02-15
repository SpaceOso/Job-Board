package tech.spaceoso.jobboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import tech.spaceoso.jobboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
//    User findByLastName(String lastName);
}
