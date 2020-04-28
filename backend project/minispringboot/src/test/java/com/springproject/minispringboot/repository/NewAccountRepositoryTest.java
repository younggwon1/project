package com.springproject.minispringboot.repository;

import static org.junit.Assert.assertThat;

import org.junit.Ignore;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.springproject.minispringboot.entity.NewAccount;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NewAccountRepositoryTest {
	@Autowired
	NewAccountRepository repository;
	
	@Test
	public void findByUsername() throws Exception {
		NewAccount existAcct = repository.findByUsername("spring");
		assertThat(existAcct).isNotNull();
		
		NewAccount notExistAcct = repository.findByUsername("test");
		assertThat(notExistAcct).isNull();
	}
	
	@Test @Ignore
	public void newaccount() throws Exception {
		NewAccount account = new NewAccount();
		account.setUsername("spring");
		account.setPassword("123411");
		
		NewAccount saveAcct = repository.save(account);
		System.out.println(saveAcct);
		assertThat(saveAcct).isNotNull();
		
	}
}

