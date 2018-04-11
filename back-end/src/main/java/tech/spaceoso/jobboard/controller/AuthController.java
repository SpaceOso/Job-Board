package tech.spaceoso.jobboard.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.model.UserLogin;
import tech.spaceoso.jobboard.repository.EmployeeRepository;
import tech.spaceoso.jobboard.security.JWTBuilder;
import tech.spaceoso.jobboard.service.JsonObjectCreator;
import tech.spaceoso.jobboard.exception.ResourceNotFoundException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;

@RestController
@RequestMapping("/auth/")
public class AuthController {
    @PersistenceContext
    private EntityManager em;

    EmployeeRepository employeeRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthController(EmployeeRepository employeeRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.employeeRepository = employeeRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    private Map<String, Object> returnedLoggedInEmployee(Employee employee){
        JSONObject data = new JSONObject();

        UUID employeeId = employee.getId();
        System.out.println(employeeId);
        Company company = null;

        // get employee object
        // TODO check that the company is not null
        System.out.println("is null" + employee.getCompany());
        if(employee.getCompany() != null){
            company = em.getReference(Company.class, employee.getCompany().getId());
            employee.setCompanyIdentifier(company.getId());
        }

        data.put("employee", employee);
        data.put("company", company);

        Map<String, Object> employeeClaims = new HashMap<String, Object>();
        employeeClaims.put("firstName", employee.getFirstName());
        employeeClaims.put("lastName", employee.getLastName());
        employeeClaims.put("email", employee.getEmail());
        employeeClaims.put("id", employee.getId());

        if(company != null){
            employeeClaims.put("companyId", employee.getCompany().getId());
        } else {
            employeeClaims.put("companyId", null);
        }


        String newToken = JWTBuilder.buildFromClaims(employeeClaims);
        data.put("token", newToken);

        return data.toMap();
    }

    @RequestMapping(value = "login/logcheck", method = RequestMethod.POST)
    private Map<String, Object> authOnLoad(@RequestBody String token) throws SignatureException {
        System.out.println(token);
        // create JSONobject to contain employee and company
        JSONObject data = new JSONObject();
        try{
            Claims user = Jwts.parser()
                    .setSigningKey(SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();

            System.out.println(user.get("firstName"));
            String employeeId = user.get("id").toString();
            System.out.println(employeeId);

            // get employee object
            Employee employee = em.getReference(Employee.class, UUID.fromString(employeeId));
            Company company = null;

            // check if employee has a company registered to it
            if (employee.getCompany() != null) {
                company = em.getReference(Company.class, employee.getCompany().getId());
                employee.setCompanyIdentifier(company.getId());
            } else {
                employee.setCompanyIdentifier(null);
            }

            data.put("employee", employee);
            data.put("company", company);

            String newToken = JWTBuilder.buildFromClaims(user);
            data.put("token", newToken);

        } catch (Exception e1){
            e1.printStackTrace();
            data = JsonObjectCreator.createSingleMessageObject("errorMessage", "Your session has expired. Please log in.");
        }

        return data.toMap();
    }

    @RequestMapping(value = "login/employee", method = RequestMethod.POST)
    private ResponseEntity<Map<String, Object>> loginEmployee(@RequestBody UserLogin user) throws ResourceNotFoundException {
        // TODO there is a way to automatically add a user to security context
        System.out.println(user.toString());
        Map<String, Object> loggedInEmploye = new HashMap<String, Object>();
        try{
            Employee employee = this.employeeRepository.findByEmail(user.getEmail());

            if(employee == null){
                throw new ResourceNotFoundException("no employee");
            }

            if(bCryptPasswordEncoder.matches(user.getPassword(), employee.getPassword())){
                System.out.println("We found an employee:" + employee.getLastName());
                loggedInEmploye = returnedLoggedInEmployee(employee);
            } else {

                throw new ResourceNotFoundException("Wrong Credentials");
            }

        }catch (ResourceNotFoundException e1){
            e1.printStackTrace();
            System.out.println("we are sending an error..");
            throw new ResourceNotFoundException("Email or password are invalid. It's ok. We all make mistakes.");
        }

        return new ResponseEntity<>(loggedInEmploye, HttpStatus.OK);
    }

}
