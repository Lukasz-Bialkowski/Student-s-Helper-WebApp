package controller;

import entity.Course;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("courses")
public class CourseController {

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public @ResponseBody Course getUsersView() {
        Course course = new Course();
        course.setName("Hurtownie danych");
        return course;
    }
}