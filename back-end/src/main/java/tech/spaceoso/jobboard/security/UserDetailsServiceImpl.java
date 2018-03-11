package tech.spaceoso.jobboard.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.repository.EmployerRepository;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private EmployeeRepository employeeRepository;

    public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public User loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(userEmail);
        if (employee == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        return new User(employee.getUsername(), employee.getPassword(), emptyList());
    }
}
