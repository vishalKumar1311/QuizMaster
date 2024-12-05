package com.resultservice.service;

import com.resultservice.dto.QuestionAnswerDto;
import com.resultservice.dto.ResponseDTO;
import com.resultservice.dto.ResultDTO;
import com.resultservice.model.QuestionResult;
import com.resultservice.model.QuizResult;
import com.resultservice.repository.QuizResultRepository;
import com.resultservice.repository.QuestionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Autowired
    private QuestionResultRepository questionResultRepository;

    private final RestTemplate restTemplate;
    private static final String QUESTION_SERVICE_URL = "http://localhost:8081/questions/getQuestion/";

    @Autowired
    public QuizResultService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Transactional
    public QuizResult submitAnswers(int userId, int quizId, List<QuestionAnswerDto> answers, LocalDateTime startTime, LocalDateTime endTime) {
        // Calculate the time taken in minutes
        long timeTaken = Duration.between(startTime, endTime).toMinutes();
        // Create a new QuizResult object
        QuizResult quizResult = new QuizResult();
        quizResult.setUserId(userId);
        quizResult.setQuizId(quizId);
        quizResult.setStartTime(startTime);
        quizResult.setEndTime(endTime);
        quizResult.setTimeTaken(timeTaken + " minutes");
        int score = 0;
        List<QuestionResult> questionResults = new ArrayList<>();

        for (QuestionAnswerDto answer : answers) {
            ResponseDTO response;
            try {
                response = restTemplate.getForObject(QUESTION_SERVICE_URL + answer.getQuestionId(), ResponseDTO.class);
            } catch (Exception e) {
                continue;
            }
            if (response == null) {
                continue;
            }
            boolean isCorrect = answer.getUserAnswer().equals(response.getCorrectAnswer());
            if (isCorrect) {
                score++;
            }
            QuestionResult questionResult = new QuestionResult();
            questionResult.setQuestionId(answer.getQuestionId());
            questionResult.setUserAnswer(answer.getUserAnswer());
            questionResult.setCorrectAnswer(response.getCorrectAnswer());
            questionResult.setQuizResult(quizResult);
            questionResults.add(questionResult);

        }

        quizResult.setScore(score);
        quizResult.setQuestionResults(questionResults);

        return quizResultRepository.save(quizResult);
    }

    public ResultDTO getResult(int userId) {

        QuizResult quizResult = quizResultRepository.findByUserId(userId);

        List<QuestionResult> questionResults = questionResultRepository.findByQuizResultId(quizResult.getId());

        ResultDTO response = new ResultDTO();
        response.setId(quizResult.getId());
        response.setUserId(quizResult.getUserId());
        response.setQuizId(quizResult.getQuizId());
        response.setScore(quizResult.getScore());
        response.setTimeTaken(quizResult.getTimeTaken());
        response.setStartTime(quizResult.getStartTime());
        response.setEndTime(quizResult.getEndTime());

        // Map each QuestionResult to QuestionResultDTO
        List<ResultDTO.QuestionResultDTO> questionResultDTOs = questionResults.stream()
                                                                                          .map(questionResult -> {
                                                                                              ResultDTO.QuestionResultDTO dto = new ResultDTO.QuestionResultDTO();
                                                                                              dto.setQuestionId(questionResult.getQuestionId());
                                                                                              dto.setUserAnswer(questionResult.getUserAnswer());
                                                                                              dto.setCorrectAnswer(questionResult.getCorrectAnswer());
                                                                                              return dto;
                                                                                          })
                                                                                          .collect(Collectors.toList());

        response.setQuestionResults(questionResultDTOs);

        return response;

    }
    public ResultDTO getResultByQuiz(int quizId) {

        QuizResult quizResult = quizResultRepository.findByQuizId(quizId);

        List<QuestionResult> questionResults = questionResultRepository.findByQuizResultId(quizResult.getId());

        ResultDTO response = new ResultDTO();
        response.setId(quizResult.getId());
        response.setUserId(quizResult.getUserId());
        response.setQuizId(quizResult.getQuizId());
        response.setScore(quizResult.getScore());
        response.setTimeTaken(quizResult.getTimeTaken());
        response.setStartTime(quizResult.getStartTime());
        response.setEndTime(quizResult.getEndTime());

        // Map each QuestionResult to QuestionResultDTO
        List<ResultDTO.QuestionResultDTO> questionResultDTOs = questionResults.stream()
                                                                              .map(questionResult -> {
                                                                                  ResultDTO.QuestionResultDTO dto = new ResultDTO.QuestionResultDTO();
                                                                                  dto.setQuestionId(questionResult.getQuestionId());
                                                                                  dto.setUserAnswer(questionResult.getUserAnswer());
                                                                                  dto.setCorrectAnswer(questionResult.getCorrectAnswer());
                                                                                  return dto;
                                                                              })
                                                                              .collect(Collectors.toList());

        response.setQuestionResults(questionResultDTOs);

        return response;

    }
}

