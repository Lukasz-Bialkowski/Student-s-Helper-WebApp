package services.impl;

import entity.Address;
import entity.Building.Building;
import entity.CourseClass;
import entity.Lecturer;
import entity.RemedialClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.BuildingsRepository;
import repository.CoursesRepository;
import repository.LecturersRepository;
import repository.RemedialClassesRepository;
import services.ICSVParser;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

@Service
public class CSVParser implements ICSVParser {

    @Autowired
    CoursesRepository coursesRepository;
    @Autowired
    LecturersRepository lecturersRepository;
    @Autowired
    RemedialClassesRepository remedialClassesRepository;
    @Autowired
    BuildingsRepository buildingsRepository;

    @Override
    public boolean coursesParseAndSave() {

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
                switch(address.getBudynek())
                {
                    case "D-1":
                    {
                        address.setLength("17.058363");
                        address.setWidth("51.110412");
                        break;
                    }
                    case "D-2":
                    {
                        address.setLength("17.056894");
                        address.setWidth("51.109983");
                        break;
                    }
                    case "C-1":
                    {
                        address.setLength("17.060573");
                        address.setWidth("51.109150");
                        break;
                    }
                    case "C-2":
                    {
                        address.setLength("17.060979");
                        address.setWidth("51.108911");
                        break;
                    }
                    case "C-3":
                    {
                        address.setLength("17.059805");
                        address.setWidth("51.109002");
                        break;
                    }
                    case "C-5":
                    {
                        address.setLength("17.058940");
                        address.setWidth("51.109191");
                        break;
                    }
                    case "C-7":
                    {
                        address.setLength("17.058042");
                        address.setWidth("51.108970");
                        break;
                    }
                    case "C-16":
                    {
                        address.setLength("17.059414");
                        address.setWidth("51.109493");
                        break;
                    }
                    case "C-6":
                    {
                        address.setLength("17.060575");
                        address.setWidth("51.108403");
                        break;
                    }
                    case "C-13":
                    {
                        address.setLength("17.059805");
                        address.setWidth("51.107402");
                        break;
                    }
                    case "A-1":
                    {
                        address.setLength("17.062026");
                        address.setWidth("51.107368");
                        break;
                    }
                    case "B-1":
                    {
                        address.setLength("17.064542");
                        address.setWidth("51.107468");
                        break;
                    }
                    case "A-5":
                    {
                        address.setLength("17.062100");
                        address.setWidth("51.108606");
                        break;
                    }
                    case "A-6":
                    {
                        address.setLength("17.061649");
                        address.setWidth("51.108343");
                        break;
                    }
                    case "B-4":
                    {
                        address.setLength("17.065293");
                        address.setWidth("51.108050");
                        break;
                    }
                    case "B-3":
                    {
                        address.setLength("17.065126");
                        address.setWidth("51.107340");
                        break;
                    }
                    case "A-2":
                    {
                        address.setLength("17.063699");
                        address.setWidth("51.107351");
                        break;
                    }
                    case "A-3":
                    {
                        address.setLength("17.063699");
                        address.setWidth("51.107353");
                        break;
                    }
                    case "D-3":
                    {
                        address.setLength("17.065126");
                        address.setWidth("51.107340");
                        break;
                    }



                }
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
                  //  remedialClass.setRepManner(entry[6]);
                    switch(entry[6])
                    {
                        case "n":
                        {
                            remedialClass.setRepManner("TN");
                            break;
                        }
                        case "p":
                        {
                            remedialClass.setRepManner("TP");
                            break;
                        }
                    }
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
                 //   course.setRepManner(entry[6]);
                    switch(entry[6])
                    {
                        case "n":
                        {
                            course.setRepManner("TN");
                            break;
                        }
                        case "p":
                        {
                            course.setRepManner("TP");
                            break;
                        }
                    }
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

    @Override
    public boolean buildingsParseAndSave() {
        String FILE_PATH = "buildings.csv";

        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";
        Building building;

        try {

            br = new BufferedReader(new FileReader(FILE_PATH));
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] entry = line.split(cvsSplitBy);
                building = new Building();

                System.out.println("Building [Nazwa= " + entry[0]
                        + " , Szerokosc=" + entry[1] +
                        " , Dlugosc=" + entry[2]);

                building.setName(entry[0]);
                building.setWidth(entry[1]);
                building.setLength(entry[2]);
                buildingsRepository.save(building);
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

    private String parseDayOfWeek(String dayStr) {

        String day = "";
        switch (dayStr) {
            case "pn":
                day = "Poniedziałek";
                break;
            case "wt":
                day = "Wtorek";
                break;
            case "sr":
                day = "Środa";
                break;
            case "czw":
                day = "Czwartek";
                break;
            case "pt":
                day = "Piątek";
                break;
            case "sob":
                day = "Sobota";
                break;
            case "sb":
                day = "Sobota";
                break;
            case "ndz":
                day = "Niedziela";
                break;
            default:
                day = dayStr;

        }

        return day;
    }
}
