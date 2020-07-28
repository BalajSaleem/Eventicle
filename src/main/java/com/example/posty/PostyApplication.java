package com.example.posty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
public class PostyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostyApplication.class, args);
	}

}
