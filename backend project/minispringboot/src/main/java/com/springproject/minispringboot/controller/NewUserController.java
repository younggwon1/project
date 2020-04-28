package com.springproject.minispringboot.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.springproject.minispringboot.entity.NewUser;
import com.springproject.minispringboot.exception.ResourceNotfoundException;
import com.springproject.minispringboot.repository.NewUserRepository;

@Controller
public class NewUserController {
	
	@Autowired
	private NewUserRepository newUserRepository;
	
	@GetMapping("/delete/{id}")
	public String deleteUser(@PathVariable("id") long id) {
		NewUser user = newUserRepository.findById(id).orElseThrow(() -> new ResourceNotfoundException("User", "id", id));
		newUserRepository.delete(user);
		return "redirect:/index";
	}
	
	@PostMapping("/edituser/{id}")
	public String updateUser(@PathVariable("id") long id, @Valid NewUser user, BindingResult result) {
		if (result.hasErrors()) {
			user.setId(id);//update-user로 돌아가기 위해서 id를 받아야한다.
			return "update-user";
		}
		newUserRepository.save(user);
		return "redirect:/index";
	}
	

	@GetMapping("/edit/{id}")
	public ModelAndView showUpdateForm(@PathVariable long id) {
		NewUser user = newUserRepository.findById(id).orElseThrow(() -> new ResourceNotfoundException("NewUser", "id", id));
		return new ModelAndView("update-user", "user", user);
	}
	
	@PostMapping("/adduser")
	public String addUser(@Valid NewUser user, BindingResult result) {
		if(result.hasErrors()) {
			return "add-user";
		}
		newUserRepository.save(user);
		return "redirect:/index";
	}
	
	@GetMapping("/signup")
	public String showSignupForm(NewUser user) {
		return "add-user";
	}
	
	@GetMapping("/index")
	public String index(Model model) {
		model.addAttribute("users", newUserRepository.findAll());
		return "index";
	}
	
	@GetMapping("/leaf")
	public ModelAndView leaf() {
		return new ModelAndView("leaf", "name", "Wellcome 타임리프");
	}
	
	@ExceptionHandler(Exception.class)
	public ModelAndView handleException(Exception ex) {
		return new ModelAndView("error/generic_error", "errMsg", ex.getMessage());		
	}
}
