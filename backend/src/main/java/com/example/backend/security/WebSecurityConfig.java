package com.example.backend.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class WebSecurityConfig {

        @Autowired
        private UserDetailsService userDetailsService;

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setUserDetailsService(userDetailsService);
                provider.setPasswordEncoder(passwordEncoder());
                return provider;
        }

        @Bean
        CorsConfigurationSource CorsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("http://localhost:5173"));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
                configuration.setAllowCredentials(true);
                configuration.addAllowedHeader(("*"));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration(("/**"), configuration);
                return source;
        }

        @Bean
        public SecurityFilterChain configure(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(Customizer.withDefaults())
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers("/signin", "/login").permitAll() // Allow public access
                                                .anyRequest().authenticated())
                                .httpBasic(Customizer.withDefaults())
                                .formLogin(formlogin -> formlogin
                                                .loginPage("http://localhost:5173/signup")
                                                .defaultSuccessUrl("/message", true)
                                                .permitAll())
                                .logout(logout -> logout
                                                .permitAll());
                return http.build();
        }
}
