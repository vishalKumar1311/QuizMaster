package com.quizservice.service;

import com.quizservice.model.MultipleChoiceQuestionDTO;
import com.quizservice.model.Quiz;
import com.quizservice.model.QuestionDTO;
import com.quizservice.model.ShortAnswerQuestionDTO;
import com.quizservice.model.TrueFalseQuestionDTO;
import com.quizservice.repository.QuizRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final RestTemplate restTemplate;
    private static final String QUESTION_SERVICE_URL = "http://localhost:8081/questions/getQuestion/";

    @Autowired
    public QuizService(QuizRepository quizRepository, RestTemplate restTemplate) {
        this.quizRepository = quizRepository;
        this.restTemplate = restTemplate;
    }


    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    public Quiz createQuiz(Quiz quizObj) {

        List<QuestionDTO> questions = fetchQuestionsByIds(quizObj.getQuestionIds(),quizObj.getQuizType());

        Quiz quiz = new Quiz();
        quiz.setId(quizObj.getId());
        quiz.setQuizName(quizObj.getQuizName());
        quiz.setQuestionIds(quizObj.getQuestionIds());
        quiz.setTimeLimit(quizObj.getTimeLimit());
        quiz.setDifficultyLevel(quizObj.getDifficultyLevel());
        quiz.setQuestions(questions);
        quiz.setQuizType(quizObj.getQuizType());
        return quizRepository.save(quiz);
    }


    public Quiz getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id).orElse(null);
        if (quiz == null) {
            return null;
        }
        List<QuestionDTO> questions = fetchQuestionsByIds(quiz.getQuestionIds(), quiz.getQuizType());
        quiz.setQuestions(questions);

        return quiz;
    }

    public Quiz updateQuiz(Long quizId, Quiz quizObj) {
        // Fetch the existing quiz by ID
        Optional<Quiz> existingQuizOpt = quizRepository.findById(quizId);

        if (existingQuizOpt.isPresent()) {
            Quiz existingQuiz = existingQuizOpt.get();

            // Update fields of the existing quiz
            existingQuiz.setQuizName(quizObj.getQuizName());
            existingQuiz.setTimeLimit(quizObj.getTimeLimit());
            existingQuiz.setDifficultyLevel(quizObj.getDifficultyLevel());
            existingQuiz.setQuizType(quizObj.getQuizType());

            // Optionally, update the questions (you could fetch and set them just like in createQuiz)
            List<QuestionDTO> updatedQuestions = fetchQuestionsByIds(quizObj.getQuestionIds(), quizObj.getQuizType());
            existingQuiz.setQuestions(updatedQuestions);

            // Save the updated quiz
            return quizRepository.save(existingQuiz);
        }

        // If quiz with the given ID does not exist, return null
        return null;
    }
    public boolean deleteQuiz(Long quizId) {
        // Check if the quiz exists by ID
        Optional<Quiz> existingQuizOpt = quizRepository.findById(quizId);

        if (existingQuizOpt.isPresent()) {
            // If quiz exists, delete it
            quizRepository.delete(existingQuizOpt.get());
            return true;
        }

        // If quiz not found, return false
        return false;
    }




    private List<QuestionDTO> fetchQuestionsByIds(List<String> questionIds,String quizType) {
        Class<? extends QuestionDTO> questionClass = null;
        if (Objects.equals(quizType, "SHORT_ANSWER")){
            questionClass = ShortAnswerQuestionDTO.class;
        }
        if (Objects.equals(quizType, "TRUE_FALSE")){
            questionClass = TrueFalseQuestionDTO.class;
        }
        if (Objects.equals(quizType, "MULTIPLE_CHOICE")){
            questionClass = MultipleChoiceQuestionDTO.class;
        }
        if (questionClass == null) {
            throw new IllegalArgumentException("Invalid quiz type provided: " + quizType);
        }

        Class<? extends QuestionDTO> finalQuestionClass = questionClass;
        return questionIds.stream()
                          .map(questionId -> restTemplate.getForObject(QUESTION_SERVICE_URL + questionId,
                                  finalQuestionClass))
                          .collect(Collectors.toList());
    }


}
