package com.springproject.minispringboot.runner;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DataBaseRunner implements ApplicationRunner {
	@Autowired
	DataSource dataSource;
	
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		try (Connection connection = dataSource.getConnection()) {
			DatabaseMetaData metaData = connection.getMetaData();
			System.out.println("URL : " + metaData.getURL());
			System.out.println("User : " + metaData.getUserName());
			System.out.println("DataSource Class Name : " + dataSource.getClass().getName());
			
//			String sql = "CREATE TABLE NOTE (ID INTEGER NOT NULL, name VARCHAR(255),PRIMARY\r\n" + "KEY (id))";
//			Statement statement = connection.createStatement();
//			statement.executeUpdate(sql);
			
//			jdbcTemplate.execute("insert into note values(5,'note1')");
//			jdbcTemplate.execute("insert into note values(6,'note2')");
		}
	}

}
