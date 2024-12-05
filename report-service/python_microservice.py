from flask import Flask,jsonify, request
import py_eureka_client.eureka_client as eureka_client
from random import randint
from datetime import datetime, timedelta
import os

app = Flask(__name__)

your_rest_server_port = 5000
# The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
eureka_client.init(eureka_server="http://localhost:8761/eureka",
                   app_name="python-service",
                   instance_port=your_rest_server_port)

@app.route('/')
def hello():
    return "Hello from Python service!"

# Mock data storage for users and quizzes (this would typically be a database)
users = {
    1: {"name": "John Doe", "quiz_scores": [85, 90, 88, 92]},
    2: {"name": "Jane Smith", "quiz_scores": [78, 82, 80, 85]},
}

quizzes = {
    101: {"title": "Math Quiz", "results": [85, 90, 88, 92]},
    102: {"title": "Science Quiz", "results": [78, 82, 80, 85]},
}

# Utility function to generate performance trend (average score over time)
def get_performance_trend(scores):
    dates = [datetime.now() - timedelta(days=i*7) for i in range(len(scores))]
    trend = [{"date": date.strftime('%Y-%m-%d'), "score": score} for date, score in zip(dates, scores)]
    return trend

# Endpoint: /generateReport/{userId}
@app.route('/generateReport/<int:user_id>', methods=['GET'])
def generate_report(user_id):
    if user_id not in users:
        return jsonify({"error": "User not found"}), 404

    user = users[user_id]
    scores = user["quiz_scores"]

    # Create a simple performance report
    report = {
        "user_id": user_id,
        "name": user["name"],
        "scores": scores,
        "average_score": sum(scores) / len(scores),
        "performance_trend": get_performance_trend(scores)
    }

    return jsonify(report)

# Endpoint: /generateQuizReport/{quizId}
@app.route('/generateQuizReport/<int:quiz_id>', methods=['GET'])
def generate_quiz_report(quiz_id):
    if quiz_id not in quizzes:
        return jsonify({"error": "Quiz not found"}), 404

    quiz = quizzes[quiz_id]
    results = quiz["results"]

    # Aggregate results
    total_users = len(results)
    average_score = sum(results) / total_users

    # Create an aggregated quiz report
    report = {
        "quiz_id": quiz_id,
        "title": quiz["title"],
        "total_users": total_users,
        "average_score": average_score,
        "result_trends": get_performance_trend(results)
    }

    return jsonify(report)

# Endpoint: /getOverallPerformance/{userId}
@app.route('/getOverallPerformance/<int:user_id>', methods=['GET'])
def get_overall_performance(user_id):
    if user_id not in users:
        return jsonify({"error": "User not found"}), 404

    user = users[user_id]
    scores = user["quiz_scores"]

    # Create a performance trend over time
    trend = get_performance_trend(scores)

    # Overall performance report (average score over all quizzes)
    report = {
        "user_id": user_id,
        "name": user["name"],
        "average_score": sum(scores) / len(scores),
        "performance_trend": trend
    }

    return jsonify(report)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
