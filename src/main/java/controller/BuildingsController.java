package controller;

import entity.Address;
import entity.Lecturer;
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

import java.util.ArrayList;
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
        Lecturer lecturer = lecturersRepository.findOne(id);
        List<RemedialClass> remedialList = new ArrayList<RemedialClass>();


        List<RemedialClass> allrc = remedialClassesRepository.findAll();

        for(RemedialClass rc :allrc){
            if(rc.getLecturer().getName().equals(lecturer.getName())&&rc.getLecturer().getSurname().equals(lecturer.getSurname())){
                remedialList.add(rc);
            }
        }
        List<RemedialInfo> remedialInfoList = new ArrayList<RemedialInfo>();
        for(RemedialClass remedialClass: remedialList) {
            Address address = remedialClass.getAddress();
            RemedialInfo remedialInfo = new RemedialInfo();
            remedialInfo.setAddress(address);
            remedialInfo.setRemedialClass(remedialClass);
            remedialInfoList.add(remedialInfo);
        }
        return new ResponseEntity<List<RemedialInfo>>(remedialInfoList, HttpStatus.OK);
    }

}
