package com.resultservice.controller;

import com.resultservice.dto.ResultDTO;
import com.resultservice.repository.QuestionResultRepository;
import com.resultservice.repository.QuizResultRepository;
import com.resultservice.service.QuizResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.resultservice.model.QuizResult;
import com.resultservice.dto.QuestionAnswerDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizResultController {

    @Autowired
    private QuizResultService quizResultService;

    @Autowired
    private QuizResultRepository quizResultRepository;

    // Endpoint to submit answers and evaluate
    @PostMapping("/submitAnswers")
    public ResponseEntity<QuizResult> submitAnswers(
            @RequestParam int userId,
            @RequestParam int quizId,
            @RequestBody List<QuestionAnswerDto> answers,
            @RequestParam String startTime,
            @RequestParam String endTime
    ) {
        try {
            LocalDateTime start = LocalDateTime.parse(startTime);
            LocalDateTime end = LocalDateTime.parse(endTime);
            QuizResult result = quizResultService.submitAnswers(userId, quizId, answers, start, end);
            return new ResponseEntity<QuizResult>(result, HttpStatus.CREATED);



        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<QuizResult>(HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint to retrieve result for a specific user and quiz
    @GetMapping("/getResult/{userId}")
    public ResponseEntity<ResultDTO> getResult(
            @PathVariable int userId
    ) {
        ResultDTO result = quizResultService.getResult(userId);
        if (result != null) {
            return new ResponseEntity<ResultDTO>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<ResultDTO>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/getResultByQ/{quizId}")
    public ResponseEntity<ResultDTO> getResultByQuiz(
            @PathVariable int quizId
    ) {
        ResultDTO result = quizResultService.getResultByQuiz(quizId);
        if (result != null) {
            return new ResponseEntity<ResultDTO>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<ResultDTO>(HttpStatus.NOT_FOUND);
        }
    }
}
