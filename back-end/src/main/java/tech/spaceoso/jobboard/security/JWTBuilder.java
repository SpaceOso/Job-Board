package tech.spaceoso.jobboard.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import tech.spaceoso.jobboard.model.Employee;

import java.util.Date;

import static tech.spaceoso.jobboard.security.SecurityConstants.EXPIRATION_TIME;
import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;

//@Component
public final class JWTBuilder {

    private JWTBuilder() {
    }

    public static String buildToken(String email, Employee employee){

        String token = Jwts.builder()
                .setSubject(email)
//                .setSubject(((User) auth.getPrincipal()).getUsername())
                .claim("firstName", employee.getFirstName())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();

        return token;
    }
}
