package com.questionservice.controller;
import com.questionservice.model.Question;
import com.questionservice.repository.QuestionRepository;
import com.questionservice.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuestionRepository questionRepository;

    @PostMapping("/addQuestion")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question createdQuestion = questionService.addQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }

    @GetMapping("/getQuestion/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long questionId) {
        return questionService.getQuestion(questionId)
                              .map(question -> new ResponseEntity<>(question, HttpStatus.OK))
                              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    // 2. Get All Questions
    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // or return empty list
        }
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
    @GetMapping("/category")
    public List<String> getAllCategories() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                        .map(Question::getCategory)
                        .distinct()  // Ensures unique categories
                        .collect(Collectors.toList());
    }

    // 3. Get Questions by Category
    @GetMapping("/getQuestionsByCategory/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        List<Question> questions = questionService.getQuestionsByCategory(category);
        if (questions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // or return empty list
        }
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    // 4. Get Questions by Question Type
    @GetMapping("/getQuestionsByType/{questionType}")
    public ResponseEntity<List<Question>> getQuestionsByType(@PathVariable String questionType) {
        try {
            Question.QuestionType type = Question.QuestionType.valueOf(questionType.toUpperCase());
            List<Question> questions = questionService.getQuestionsByType(type);
            if (questions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT); // or return empty list
            }
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Invalid question type
        }
    }

    @PutMapping("/updateQuestion/{questionId}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long questionId,
            @RequestBody Question questionDetails) {

        try {
            Question updatedQuestion = questionService.updateQuestion(questionId, questionDetails);
            return new ResponseEntity<>(updatedQuestion, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteQuestion/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
