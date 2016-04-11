package controller;

import entity.Address;
import entity.RemedialClass;
import entity.RemedialInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import repository.BuildingsRepository;
import repository.LecturersRepository;
import repository.RemedialClassesRepository;
import services.ICSVParser;

import java.util.List;

@Controller
@RequestMapping("buildings")
public class BuildingsController {

    @Autowired
    ICSVParser parser;

    @Autowired
    BuildingsRepository buildingsRepository;
    @Autowired
    RemedialClassesRepository remedialClassesRepository;
    @Autowired
    LecturersRepository lecturersRepository;

    @RequestMapping(value = "/parse", method = RequestMethod.GET)
    public @ResponseBody void parse() {
        parser.buildingsParseAndSave();
    }


    @RequestMapping(value ="/lecturer/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getLecturerAddress(@PathVariable Long id)
    {
        List<RemedialClass> allrc = remedialClassesRepository.findAll();
        RemedialClass remedialClass = new RemedialClass();

        for(RemedialClass rc :allrc){
            if(rc.getLecturer().getId().equals(id)){
                remedialClass = rc;
            }
        }
        Address address = remedialClass.getAddress();

        RemedialInfo remedialInfo = new RemedialInfo();
        remedialInfo.setAddress(address);
        remedialInfo.setRemedialClass(remedialClass);

        return new ResponseEntity<RemedialInfo>(remedialInfo, HttpStatus.OK);
    }

}
