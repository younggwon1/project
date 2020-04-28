package com.springproject.minispringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MinispringbootApplication {

	public static void main(String[] args) {
		// SpringApplication.run(MinispringbootApplication.class, args);
		// WebApplication type 변경
		SpringApplication application = new SpringApplication(MinispringbootApplication.class);

		// Default WebApplication Type이 Servlet이다.
		application.setWebApplicationType(WebApplicationType.SERVLET);

		// Default WebApplication Type을 none으로 바꿔보자.
		// application.setWebApplicationType(WebApplicationType.NONE);
		// Default WebApplication Type을 none으로 바꾸게 되면 사이트에 연결x

		application.run(args);
	}

}
