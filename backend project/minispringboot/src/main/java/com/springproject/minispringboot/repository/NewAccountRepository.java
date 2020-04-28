package com.springproject.minispringboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springproject.minispringboot.entity.NewAccount;

public interface NewAccountRepository extends JpaRepository<NewAccount, Long>{
	NewAccount findByUsername(String username);
}
