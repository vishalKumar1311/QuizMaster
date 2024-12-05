package com.quizservice.Feign;

import com.quizservice.model.QuestionDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("QUESTION_SERVICE")
public interface QuestionInterface {

    @GetMapping("/getQuestion/{questionId}")
    public ResponseEntity<QuestionDTO> getQuestion(@PathVariable Long questionId);


}
