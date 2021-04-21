# About project

Educational portal for communication between mentor and mentee.
Application uses Spring Boot + React.js as main backend + frontend technologies.

## To Run
```shell script
// bring up application
mvnw spring-boot:run

// test
curl localhost:8080/api/ -u albus:111111 
curl localhost:8080/api/students/1 -u albus:111111

// to save a new group
curl -X POST localhost:8080/api/classes -d "{\"uuid\": \"2\", \"name\": \"hufflepuf\", \"owner\": \"http://localhost:8080/api/teachers/1\"}" -H "Content-Type:application/json" -u albus:111111

// to update task 
curl -X PUT -H "Content-Type:application/json" http://localhost:8080/api/tasks/1 -d "{\"title\": \"Kill dragon\", \"description\": \"Try to kill dragon in order to survive among mermaids\"}" -u albus:111111

// assign task to a student
curl -X POST http://localhost:8080/api/taskStudents -d "{\"uuid\": \"1\", \"student\": \"http://localhost:8080/api/students/1\", \"task\": \"http://localhost:8080/api/tasks/1\"}" -H "Content-Type:application/json" -u albus:111111

// assign task to the class
curl -X POST http://localhost:8080/api/taskClasses -d "{\"uuid\": \"1\", \"classEntity\": \"http://localhost:8080/api/classes/1\", \"task\": \"http://localhost:8080/api/tasks/1\"}" -H "Content-Type:application/json" -u albus:111111

// add user to a class
curl -X POST http://localhost:8080/api/classStudents -d "{\"uuid\": \"1\", \"classEntity\": \"http://localhost:8080/api/classes/1\", \"student\": \"http://localhost:8080/api/students/1\"}" -H "Content-Type:application/json" -u albus:111111

// find all student assigned to the task
curl http://localhost:8080/api/taskStudents/search/findAllStudentByTaskUuid?uuid=1 -u albus:111111

// find all students in the class
curl http://localhost:8080/api/classStudents/search/findAllStudentByClassUuid?uuid=1 -u albus:111111

// find all classes assinged to the task
curl http://localhost:8080/api/taskClasses/search/findAllClassesByTaskUuid?uuid=1 -u albus:111111
// remove student from task
curl -X DELETE http://localhost:8080/api/taskStudents/{task_student_id} -u albus:111111
// remove student from class
curl -X DELETE http://localhost:8080/api/classStudents/{class_student_id} -u albus:111111
// remove class from task
curl -X DELETE http://localhost:8080/api/taskClasses/{task_class_id} -u albus:111111
// remove class
curl -X DELETE localhost:8080/api/classes/{class_id} -u albus:111111
```

## Database design
Entity-relationship diagram
 
![database](docs/img/database/e-r.png)

Tables
 
![database](docs/img/database/database.png)


### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.4.3/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/2.4.3/maven-plugin/reference/html/#build-image)
* [Rest Repositories](https://docs.spring.io/spring-boot/docs/2.4.3/reference/htmlsingle/#howto-use-exposing-spring-data-repositories-rest-endpoint)
* [Thymeleaf](https://docs.spring.io/spring-boot/docs/2.4.3/reference/htmlsingle/#boot-features-spring-mvc-template-engines)
* [Spring Data JPA](https://docs.spring.io/spring-boot/docs/2.4.3/reference/htmlsingle/#boot-features-jpa-and-spring-data)

### Guides
The following guides illustrate how to use some features concretely:

* [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
* [Accessing Neo4j Data with REST](https://spring.io/guides/gs/accessing-neo4j-data-rest/)
* [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
* [Handling Form Submission](https://spring.io/guides/gs/handling-form-submission/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

