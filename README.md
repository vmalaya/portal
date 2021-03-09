# About project

Educational portal for communication between mentor and mentee.
Application uses Spring Boot + React.js as main backend + frontend technologies.

## To Run
```shell script
// bring up application
mvnw spring-boot:run

// test
curl localhost:8080/api/
curl localhost:8080/api/users/1
// to save a new user
curl -X POST localhost:8080/api/users -d "{\"username\": \"Bilbo.ba\", \"password\": \"dragon\", \"role\": \"teacher\"}" -H "Content-Type:application/
json"

```

## Database design

````
                           +-----------+
                           |User_Class |        +------+
   +-----------+           +-----------+        |Class |
   |    User   |           |id PK      |        +------+
   +-----------+           |class_id FK|<-----+-|id PK |
   |PK id      |-----+---->|user_id FK |      | |name  |
   |username   |     |     +-----------+      | +------+
   |password   |     |                        |
   |role       |     |                        |
   +-----------+     |  +-----------------+   |
                  +--+--| Task            |   |
 +-------------+  |  |  +-----------------+   |
 |Task_Assignee|  |  |  |id PK            |   |
 +-------------+  |  |  |title            |   |
 |id  PK       |  |  |  |description      |   |
 |task_id    FK|<-+  +->|createdBy        |   |
 |user_id    FK|<----+  |status           |   |
 |class_id FK  |<-+     +-----------------+   |
 +-------------+  |                           |
                  +---------------------------+
````

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

