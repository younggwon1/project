package com.springproject.minispringboot.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springproject.minispringboot.entity.NewUser;
import com.springproject.minispringboot.exception.ResourceNotfoundException;
import com.springproject.minispringboot.repository.NewUserRepository;

@RestController
public class NewUserRestController {
	@Autowired
	private NewUserRepository repository;

	@PostMapping("/userss")
	public NewUser create(@RequestBody NewUser user) {
		return repository.save(user);
	}

	@GetMapping("/userss")
	public List<NewUser> getNewUsers() {
		return repository.findAll();
	}

	@GetMapping("/userss/{id}")
	public NewUser getUNewUser(@PathVariable Long id) {
		Optional<NewUser> userOpt = repository.findById(id);
		NewUser user = userOpt.orElseThrow(() -> new ResourceNotfoundException("NewUser", "id", id));
		return user;
	}

	@PutMapping("/userss/{id}")
	public NewUser updateUser(@PathVariable Long id, @RequestBody NewUser userDetail) {
		NewUser user = repository.findById(id).orElseThrow(() -> new ResourceNotfoundException("NewUser", "id", id));
		user.setName(userDetail.getName());
		user.setEmail(userDetail.getEmail());

		NewUser updateUser = repository.save(user);
		return updateUser;
	}

	@DeleteMapping("/userss/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		NewUser user = repository.findById(id).orElseThrow(() -> new ResourceNotfoundException("NewUser", "id", id));
		repository.delete(user);
		return new ResponseEntity<String>(user.getId() + "delete", HttpStatus.OK);
	}

	// xml
	@GetMapping(value = "/userssxml", produces = { "application/xml" })
	public List<NewUser> getUsersXml() {
		return repository.findAll();
	}
}
