package com.example.backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.domain.user.AppUser;
import com.example.backend.domain.user.AppUserRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final AppUserRepository repository;

    public UserDetailServiceImpl(AppUserRepository userRepository) {
        this.repository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser curruser = repository.findByUsername(username);
        UserDetails user = new org.springframework.security.core.userdetails.User(username,
                curruser.getPassword(),
                AuthorityUtils.createAuthorityList(curruser.getUserRole().getRoleType()));
        return user;
    }
}