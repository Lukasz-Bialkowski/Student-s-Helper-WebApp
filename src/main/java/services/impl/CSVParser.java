package services.impl;

import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.CoursesRepository;
import repository.LecturersRepository;
import repository.RemedialClassesRepository;
import services.ICSVParser;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.DayOfWeek;

@Service
public class CSVParser implements ICSVParser {

    @Autowired
    CoursesRepository coursesRepository;
    @Autowired
    LecturersRepository lecturersRepository;
    @Autowired
    RemedialClassesRepository remedialClassesRepository;

    @Override
    public boolean parseAndSave() {

        String FILE_PATH = "data.csv";

        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";

        try {

            Lecturer lecturer;
            RemedialClass remedialClass;
            CourseClass course;
            Address address;

            br = new BufferedReader(new FileReader(FILE_PATH));
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] entry = line.split(cvsSplitBy);
                address = new Address();
                lecturer = new Lecturer();

                System.out.println("Lecturer [Imie= " + entry[1]
                        + " , Nazwisko=" + entry[2] +
                        " , Tytul=" + entry[0] +
                        " , Dzien=" + entry[3] +
                        " , Poczatek=" + entry[4] +
                        " , Koniec=" + entry[5] +
                        " , P/PN=" + entry[6] +
                        " , Kurs=" + entry[7] +
                        " , Budynek=" + entry[8] +
                        " , Sala=" + entry[9] +
                        " , Typ kursu=" + entry[10] + "]");

                address.setBudynek(entry[8]);
                address.setSala(entry[9]);

                lecturer.setName(entry[1]);
                lecturer.setSurname(entry[2]);
                lecturer.setTelephone("");
                lecturer.setTitle(entry[0]);
                lecturer.setWebsite("");

                if ("k".equals(entry[10]) || "K".equals(entry[10])) {
                    remedialClass = new RemedialClass();
                    remedialClass.setAddress(address);
                    remedialClass.setDayOfWeek(parseDayOfWeek(entry[3]));
                    remedialClass.setLecturer(lecturer);
                    remedialClass.setStartTime(entry[4]);
                    remedialClass.setEndTime(entry[5]);
                    remedialClass.setRepManner(entry[6]);
                    remedialClassesRepository.save(remedialClass);

                } else {
                    course = new CourseClass();
                    course.setAddress(address);
                    course.setDayOfWeek(parseDayOfWeek(entry[3]));
                    course.setLecturer(lecturer);
                    course.setStartTime(entry[4]);
                    course.setEndTime(entry[5]);
                    course.setName(entry[7]);
                    course.setType(entry[10]);
                    course.setRepManner(entry[6]);
                    coursesRepository.save(course);

                }

            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("Done");
        return true;
    }

    private DayOfWeek parseDayOfWeek(String dayStr) {

        DayOfWeek day = null;
        switch (dayStr) {
            case "pn":
                day = DayOfWeek.MONDAY;
                break;
            case "Poniedziałek":
                day = DayOfWeek.MONDAY;
                break;
            case "wt":
                day = DayOfWeek.TUESDAY;
                break;
            case "Wtorek":
                day = DayOfWeek.TUESDAY;
                break;
            case "sr":
                day = DayOfWeek.WEDNESDAY;
                break;
            case "Środa":
                day = DayOfWeek.WEDNESDAY;
                break;
            case "czw":
                day = DayOfWeek.THURSDAY;
                break;
            case "Czwartek":
                day = DayOfWeek.THURSDAY;
                break;
            case "pt":
                day = DayOfWeek.FRIDAY;
                break;
            case "Piątek":
                day = DayOfWeek.FRIDAY;
                break;
            case "sob":
                day = DayOfWeek.SATURDAY;
                break;
            case "sb":
                day = DayOfWeek.SATURDAY;
                break;
            case "Sobota":
                day = DayOfWeek.SATURDAY;
                break;
            case "ndz":
                day = DayOfWeek.SUNDAY;
                break;
            case "Niedziela":
                day = DayOfWeek.SUNDAY;
                break;

        }

        return day;
    }
}
