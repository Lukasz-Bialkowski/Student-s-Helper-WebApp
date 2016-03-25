package entity;

import javax.persistence.*;
import java.time.DayOfWeek;

@Entity
public class CourseClass {

    @Id
    @GeneratedValue
    Long id;

    String name;

    @OneToOne(cascade = CascadeType.ALL)
    Lecturer lecturer;

    String startTime;

    String endTime;

    @Enumerated(EnumType.STRING)
    DayOfWeek dayOfWeek;

    String repManner;

    String type;

    @OneToOne(cascade = CascadeType.ALL)
    Address address;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Lecturer getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecturer lecturer) {
        this.lecturer = lecturer;
    }

    public Address getAddress() {
        return address;
    }

    public String getRepManner() {
        return repManner;
    }

    public void setRepManner(String repManner) {
        this.repManner = repManner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "CourseClass{" +
                "id=" + id +
                ", lecturer=" + lecturer +
                ", address=" + address +
                '}';
    }
}
