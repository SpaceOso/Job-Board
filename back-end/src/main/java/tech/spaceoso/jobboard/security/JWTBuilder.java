package tech.spaceoso.jobboard.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import tech.spaceoso.jobboard.model.Employee;

import java.util.Date;
import java.util.Map;

import static tech.spaceoso.jobboard.security.SecurityConstants.EXPIRATION_TIME;
import static tech.spaceoso.jobboard.security.SecurityConstants.SECRET;
import static tech.spaceoso.jobboard.security.SecurityConstants.TOKEN_PREFIX;

//@Component
public final class JWTBuilder {

    private JWTBuilder() {
    }

    public static String buildToken(String email, Employee employee){
        System.out.println("BUILDING REGULAR TOKEN TOKEN!!!! " + email);
        String token = Jwts.builder()
                .setSubject(employee.getEmail())
                .claim("firstName", employee.getFirstName())
                .claim("lastName", employee.getLastName())
                .claim("email", employee.getEmail())
                .claim("id", employee.getId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();

        return token;
    }

    public static String buildCompanyToken(String email, Employee employee) {
        System.out.println("BUILDING COMPANY TOKEN!!!! " + email);
        String token = Jwts.builder()
                .setSubject(employee.getEmail())
                .claim("firstName", employee.getFirstName())
                .claim("lastName", employee.getLastName())
                .claim("email", employee.getEmail())
                .claim("companyId", employee.getCompany().getId())
                .claim("id", employee.getId())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        return token;
    }

    public static String buildFromClaims(Map<String, Object> claims){
        System.out.println("building from claims "+ claims.get("email").toString());
        String token = Jwts.builder()
                .setSubject(claims.get("email").toString())
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.getBytes())
                .compact();
        return token;
    }

    public static String decipherToken(String token) {
        String newToken = "";

        String user = Jwts.parser()
                .setSigningKey(SECRET.getBytes())
                .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                .getBody()
                .getSubject();

        return newToken;
    }
}
