package tech.spaceoso.jobboard.security;

/**
 * Code for this came from tutorial fond:
 * https://auth0.com/blog/implementing-jwt-authentication-on-spring-boot/
 */


public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
}
