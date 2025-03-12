package com.example.backend.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.domain.Dummydata;
import com.example.backend.domain.DummydataRepository;

import java.util.List;

@RestController
@RequestMapping
public class RecipeController {

    @Autowired 
    private DummydataRepository dummydataRepository;

    @CrossOrigin
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public @ResponseBody List<Dummydata> getDummyData() {
        return (List<Dummydata>) dummydataRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/message")
    public String getMessage() {
        return "HELLO BACKEND";
    }
}
