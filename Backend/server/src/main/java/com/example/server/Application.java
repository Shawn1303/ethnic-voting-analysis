package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.autoconfigure.domain.EntityScan;
// import org.springframework.context.annotation.ComponentScan;

//@EnableJpaRepositories("com.*") 
// @ComponentScan(basePackages = { "com.*" }) 
// @EntityScan("com.*")
@SpringBootApplication //Includes @ComponentScan, everything within main should be checked automatically
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
