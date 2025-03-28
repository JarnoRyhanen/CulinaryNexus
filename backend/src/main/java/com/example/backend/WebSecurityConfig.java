package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {

        private UserDetailsService userDetailsService;

        public WebSecurityConfig(UserDetailsService userDetailsService) {
                this.userDetailsService = userDetailsService;
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Autowired
        public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
        }

        @Bean
        public SecurityFilterChain configure(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                            .authorizeHttpRequests(authorize -> authorize
                                    .requestMatchers("/user", "/").permitAll() // Allow public access
                                    .anyRequest().authenticated())
                            .formLogin(formlogin -> formlogin
                                    .loginPage("http://localhost:5173/signup")
                                    .defaultSuccessUrl("/http://localhost:5173/home", true)
                                    .permitAll())
                            .logout(logout -> logout
                                    .permitAll());
                return http.build();
        }
}
