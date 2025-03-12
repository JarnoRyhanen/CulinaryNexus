package com.example.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.example.backend.domain.Dummydata;
import com.example.backend.domain.DummydataRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner clr(DummydataRepository dummydataRepository) {
        return (args) -> {
            Dummydata dummydata1 = new Dummydata("jaakko", "jaakko@jaakko.fi");
            Dummydata dummydata2 = new Dummydata("Kalle", "kalle@kalle.fi");
            Dummydata dummydata3 = new Dummydata("Mikko", "Mikko@Mikko.fi");
            Dummydata dummydata4 = new Dummydata("Minä", "Minä@Minä.fi");
            Dummydata dummydata5 = new Dummydata("Minä", "Minä@Minä.fi");
            Dummydata dummydata6 = new Dummydata("Minä", "Minä@Minä.fi");
            Dummydata dummydata7 = new Dummydata("Minä", "Minä@Minä.fi");

            dummydataRepository.save(dummydata1);
            dummydataRepository.save(dummydata2);
            dummydataRepository.save(dummydata3);
            dummydataRepository.save(dummydata4);
            dummydataRepository.save(dummydata5);
            dummydataRepository.save(dummydata6);
            dummydataRepository.save(dummydata7);

            for (Dummydata dummydata : dummydataRepository.findAll()) {
                System.out.println(dummydata.toString());
            }
        };
    }

}