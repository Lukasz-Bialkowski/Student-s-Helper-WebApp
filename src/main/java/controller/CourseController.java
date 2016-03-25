package controller;

import entity.CourseClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import services.ICSVParser;

@RestController
@RequestMapping("courses")
public class CourseController {

    @Autowired
    ICSVParser parser;

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public @ResponseBody CourseClass geetUsersView() {
        CourseClass course = new CourseClass();
        course.setName("Hurtownie danych");
        return course;
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public @ResponseBody void tester() {
        parser.parseAndSave();
    }
}