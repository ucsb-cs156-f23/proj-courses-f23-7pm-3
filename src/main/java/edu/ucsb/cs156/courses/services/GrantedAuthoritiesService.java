package edu.ucsb.cs156.courses.services;

import java.util.Collection;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Slf4j
@Service("grantedAuthorities")
public class GrantedAuthoritiesService {

  public Collection<? extends GrantedAuthority> getGrantedAuthorities() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();
    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    log.info("authorities={}", authorities);
    return authorities;
  }
}
