package com.project.manager.Services;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.manager.Models.User;
import com.project.manager.Repositories.UserRepository;


@Service
public class AuthService implements UserDetailsService {
    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRol().getName());

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), 
            user.getPassword(), 
            Collections.singleton(authority)
        );
    }
}
