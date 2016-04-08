package controller;

import entity.CourseClass;
import entity.Lecturer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import repository.CoursesRepository;
import repository.LecturersRepository;
import services.ICSVParser;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("courses")
public class CourseController {

    @Autowired
    ICSVParser parser;

    @Autowired
    CoursesRepository coursesRepository;

    @Autowired
    LecturersRepository lecturersRepository;

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCourses() {
        List<CourseClass> courses = coursesRepository.findAll();
        System.out.println(courses.size());
        return new ResponseEntity<List<CourseClass>>(courses, HttpStatus.OK);
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/course/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getOneCourse(@PathVariable Long id) {
        CourseClass course = coursesRepository.findOne(id);
        System.out.println(course);
        return new ResponseEntity<CourseClass>(course, HttpStatus.OK);
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/parse", method = RequestMethod.GET)
    public @ResponseBody void parse() {
        parser.coursesParseAndSave();
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/lecturer/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> coursesForLecturer(@PathVariable Long id) {
        Lecturer lecturer = lecturersRepository.findOne(id);
        List<CourseClass> result = new ArrayList<>();
        List<CourseClass> courses = coursesRepository.findAll();
        for (CourseClass c : courses) {
            if (c.getLecturer().getName().equals(lecturer.getName())|| c.getLecturer().getSurname().equals(lecturer.getSurname())) {
                result.add(c);
            }
        }
        System.out.println(courses);
        System.out.println(result);
        return new ResponseEntity<List<CourseClass>>(result, HttpStatus.OK);
    }


}