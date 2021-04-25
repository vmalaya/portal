package com.melnychenko.portal;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.MediaTypes;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.linkWithRel;
import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.links;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@AutoConfigureRestDocs()
@SpringBootTest
public class ApiDocumentation {
    @Rule
    public final JUnitRestDocumentation restDocumentation = new JUnitRestDocumentation();

    @Autowired
    private WebApplicationContext context;
    @Autowired
    private ObjectMapper objectMapper;
    private MockMvc mockMvc;

    @Before
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
                                      .apply(documentationConfiguration(this.restDocumentation))
                                      .alwaysDo(document("{method-name}",
                                                         preprocessRequest(prettyPrint()),
                                                         preprocessResponse(prettyPrint())))
                                      .build();
    }

    @Test
    public void apiExample() throws Exception {
        this.mockMvc.perform(get("/api"))
                    .andExpect(status().isOk())
                    .andDo(document("api-example",
                                    links(
                                            linkWithRel("tasks").description("The <<resources_tasks,Tasks resource>>"),
                                            linkWithRel("taskClasses").description(
                                                    "The <<taskClasses,TaskClasses resource>>"),
                                            linkWithRel("classStudents").description(
                                                    "The <<classStudents,ClassStudents resource>>"),
                                            linkWithRel("taskStudents").description(
                                                    "The <<taskStudents,TaskStudents resource>>"),
                                            linkWithRel("students").description("The <<students,Students resource>>"),
                                            linkWithRel("teachers").description("The <<teachers,Teachers resource>>"),
                                            linkWithRel("classes").description("The <<classes,Classes resource>>"),
                                            linkWithRel("profile").description("The ALPS profile for the service")),
                                    responseFields(
                                            subsectionWithPath("_links").description(
                                                    "<<resources_index_access_links,Links>> to other resources"))));

    }

    @Test
    public void studentsGetExample() throws Exception {

        this.mockMvc.perform(get("/api/students"))
                    .andExpect(status().isOk())
                    .andDo(document("students-get-example",
                                    links(
                                            linkWithRel("self").description("Canonical link for this resource"),
                                            linkWithRel("profile").description("The ALPS profile for this resource")),
                                    responseFields(
                                            subsectionWithPath("_embedded.students").description(
                                                    "An array of <<resources_student, Student resources>>"),
                                            subsectionWithPath("_links").description(
                                                    "<<resources_students_links, Links>> to other resources"))));
    }

    @Test
    public void studentCreateExample() throws Exception {
        Map<String, Object> students = new HashMap<>();
        students.put("uuid", "5");
        students.put("username", "username");
        students.put("password", "password");

        this.mockMvc.perform(post("/api/students").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(students)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("create-student-example",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the input"),
                                                                            fieldWithPath("username").description(
                                                                                    "The username of the student"),
                                                                            fieldWithPath("password").description(
                                                                                    "The password of the student")
                                                                            )));
    }

    @Test
    public void classCreateExample() throws Exception {
        Map<String, Object> students = new HashMap<>();
        students.put("uuid", "5");
        students.put("name", "hufflepuf");
        students.put("owner", "http://localhost:8080/api/teachers/1");

        this.mockMvc.perform(post("/api/classes").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(students)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("create-class-example",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the input"),
                                                                            fieldWithPath("name").description(
                                                                                    "The name of the class"),
                                                                            fieldWithPath("owner").description(
                                                                                    "The resource of a teacher who created the class")
                                                                            )));
    }

    @Test
    public void taskCreateExample() throws Exception {
        Map<String, Object> tasks = new HashMap<>();
        tasks.put("uuid", "5");
        tasks.put("title", "Kill the dragon.");
        tasks.put("description", "Full description of the task.");
        tasks.put("createdBy", "http://localhost:8080/api/teachers/1");

        this.mockMvc.perform(post("/api/tasks").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(tasks)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("create-task-example",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the task"),
                                                                            fieldWithPath("title").description(
                                                                                    "The title of the task"),
                                                                            fieldWithPath("description").description(
                                                                                    "Full description of the task"),
                                                                            fieldWithPath("createdBy").description(
                                                                                    "The resource of a teacher who created the task")
                                                                            )));
    }

    @Test
    public void assignStudentToTaskExample() throws Exception {
        Map<String, Object> entity = new HashMap<>();
        entity.put("uuid", "1");
        entity.put("student", "http://localhost:8080/api/students/1");
        entity.put("task", "http://localhost:8080/api/tasks/1");

        this.mockMvc.perform(post("/api/taskStudents").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(entity)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("assign-student-to-the-task",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the record to map student and task"),
                                                                            fieldWithPath("student").description(
                                                                                    "The resource of the student who is meant tobe assigned to the task"),
                                                                            fieldWithPath("task").description(
                                                                                    "The resource of the task")
                                                                            )));
    }

    @Test
    public void assignClassToTaskExample() throws Exception {
        Map<String, Object> entity = new HashMap<>();
        entity.put("uuid", "1");
        entity.put("classEntity", "http://localhost:8080/api/classes/1");
        entity.put("task", "http://localhost:8080/api/tasks/1");

        this.mockMvc.perform(post("/api/taskClasses").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(entity)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("assign-class-to-the-task",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the record to map class and task"),
                                                                            fieldWithPath("classEntity").description(
                                                                                    "The resource of the class that is meant tobe assigned to the task"),
                                                                            fieldWithPath("task").description(
                                                                                    "The resource of the task")
                                                                            )));
    }

    @Test
    public void assignStudentToClassExample() throws Exception {
        Map<String, Object> entity = new HashMap<>();
        entity.put("uuid", "1");
        entity.put("classEntity", "http://localhost:8080/api/classes/1");
        entity.put("student", "http://localhost:8080/api/student/1");

        this.mockMvc.perform(post("/api/classStudents").contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(entity)))
                                              .andExpect(status().isCreated())
                                              .andDo(document("assign-student-to-the-class",
                                                              requestFields(fieldWithPath("uuid").description(
                                                                      "The id of the record to map class and task"),
                                                                            fieldWithPath("classEntity").description(
                                                                                    "The resource of the class"),
                                                                            fieldWithPath("student").description(
                                                                                    "The resource of the student who should be assigned to the class")
                                                                            )));
    }

    @Test
    public void taskUpdateExample() throws Exception {
        Map<String, Object> tasks = new HashMap<>();
        tasks.put("title", "Kill the dragon.");
        tasks.put("description", "Full description of the task.");

        this.mockMvc.perform(put("/api/tasks/{id}", 1).contentType(MediaTypes.HAL_JSON)
                                              .content(this.objectMapper.writeValueAsString(tasks)))
                                              .andExpect(status().isNoContent())
                                              .andDo(document("update-task-example", pathParameters(
                                                      parameterWithName("id").description("The id of the task to update")
                                              )));
    }

    @Test
    public void classDeleteExample() throws Exception {
        this.mockMvc.perform(delete("/api/classes/{id}", 1)).andExpect(status().isNoContent())
                    .andDo(document("class-delete-example",
                                    pathParameters(
                                            parameterWithName("id").description("The id of the class to delete")
                                    )));
    }

    @Test
    public void taskDeleteExample() throws Exception {
        this.mockMvc.perform(delete("/api/tasks/{id}", 1)).andExpect(status().isNoContent())
                    .andDo(document("task-delete-example",
                                    pathParameters(
                                            parameterWithName("id").description("The id of the class to delete")
                                    )));
    }

    @Test
    public void getAllStudentsAssignedToTaskExample() throws Exception {
        this.mockMvc.perform(get("/api/taskStudents/search/findAllStudentByTaskUuid?uuid={uuid}", 1))
                    .andExpect(status().isOk())
                    .andDo(document("get-students-by-the-task-example",
                                    responseFields(
                                            subsectionWithPath("_embedded.students").description(
                                                    "An array of <<resources_student, Student resources>>"),
                                            subsectionWithPath("_links").description(
                                                    "<<resources_students_links, Links>> to other resources"))));
    }
}
