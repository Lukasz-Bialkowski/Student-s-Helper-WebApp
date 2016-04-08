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
import repository.LecturersRepository;

import java.util.HashSet;
import java.util.List;

@Controller
@RequestMapping("lecturers")
public class LecturerController {

    @Autowired
    LecturersRepository lecturersRepository;

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<?> getLecturers() {
        List<Lecturer> lecturers = lecturersRepository.findAll();
        HashSet<Lecturer> lecturersSet = new HashSet<Lecturer>(lecturers);
        return new ResponseEntity<HashSet<Lecturer>>(lecturersSet, HttpStatus.OK);
    }

    @RequestMapping(value = "/lecturer/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getOneLecturer(@PathVariable Long id) {
        Lecturer lecturer = lecturersRepository.findOne(id);
        return new ResponseEntity<Lecturer>(lecturer, HttpStatus.OK);
    }

}
