package com.springproject.minispringboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springproject.minispringboot.entity.NewUser;

public interface NewUserRepository extends JpaRepository<NewUser, Long>{
	Optional<NewUser> findByName(String name);
	Optional<NewUser> findByEmail(String email);

}
