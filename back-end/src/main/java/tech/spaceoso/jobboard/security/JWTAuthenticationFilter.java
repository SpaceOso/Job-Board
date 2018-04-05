package tech.spaceoso.jobboard.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.ui.ModelMap;
import tech.spaceoso.jobboard.model.Employee;
import tech.spaceoso.jobboard.repository.EmployeeRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static tech.spaceoso.jobboard.security.SecurityConstants.EXPIRATION_TIME;
import static tech.spaceoso.jobboard.security.SecurityConstants.HEADER_STRING;
import static tech.spaceoso.jobboard.security.SecurityConstants.TOKEN_PREFIX;
import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;

/**
 * Code for this came from tutorial fond:
 * https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
 */


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private EmployeeRepository employeeRepository;


    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, EmployeeRepository employeeRepository){
        this.authenticationManager = authenticationManager;
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
            Employee creds = new ObjectMapper()
                    .readValue(req.getInputStream(), Employee.class);


            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getEmail(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String email = ((User)auth.getPrincipal()).getUsername();
        Employee employee = employeeRepository.findByEmail(email);

       /* String token = Jwts.builder()
                .setSubject(email)
                .setSubject(((User) auth.getPrincipal()).getUsername())
                .claim("firstName", employee.getFirstName())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();*/

        String token = JWTBuilder.buildToken(email, employee);

        ObjectMapper mapper = new ObjectMapper();
        Gson gson = new Gson();

        String jsonString = mapper.writeValueAsString(employee);
        ModelMap model = new ModelMap("token", TOKEN_PREFIX + token);
        String jsonToken = mapper.writeValueAsString(model);


        JSONObject  userInfo = new JSONObject();
        JSONObject emloyerInfo = new JSONObject(employee);
        userInfo.put("token", TOKEN_PREFIX + token);
        //TODO need to get companyId from employee
        //TODO need to add companyId property to employee model
        userInfo.put("companyId", JSONObject.NULL);
        userInfo.put("employee", emloyerInfo);

        res.getWriter().write(userInfo.toString());
        res.getWriter().flush();
        res.getWriter().close();


        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);

    }

}
