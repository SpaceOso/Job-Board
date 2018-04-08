package tech.spaceoso.jobboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import tech.spaceoso.jobboard.model.Company;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.security.JWTBuilder;
import tech.spaceoso.jobboard.service.JsonObjectCreator;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.util.Map;
import java.util.UUID;

import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;

@RestController
@RequestMapping("/auth/")
public class AuthController {
    @PersistenceContext
    private EntityManager em;

    @RequestMapping(value = "/login/logcheck", method = RequestMethod.POST)
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

            Company company = em.getReference(Company.class, employee.getCompany().getId());
            employee.setCompanyIdentifier(company.getId());
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
}
