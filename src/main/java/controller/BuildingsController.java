package controller;

import entity.Building.Building;
import entity.CourseClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import repository.BuildingsRepository;
import services.ICSVParser;

import java.util.List;

@Controller
@RequestMapping("buildings")
public class BuildingsController {

    @Autowired
    ICSVParser parser;

    @Autowired
    BuildingsRepository buildingsRepository;

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<?> getAllBuildings() {
        List<Building> buildings = buildingsRepository.findAll();
        return new ResponseEntity<List<Building>>(buildings, HttpStatus.OK);
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/building/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getOneCourse(@PathVariable Long id) {
        Building building = buildingsRepository.findOne(id);
        return new ResponseEntity<Building>(building, HttpStatus.OK);
    }

    /**
     * Request mapping for course
     */
    @RequestMapping(value = "/parse", method = RequestMethod.GET)
    public @ResponseBody void parse() {
        parser.buildingsParseAndSave();
    }

}
