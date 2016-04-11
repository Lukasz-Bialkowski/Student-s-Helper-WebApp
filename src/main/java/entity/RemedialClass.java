package entity;

import javax.persistence.*;

@Entity
public class RemedialClass {

    @Id
    @GeneratedValue
    Long id;

    @OneToOne(cascade = CascadeType.ALL)
    Lecturer lecturer;

    String startTime;

    String endTime;

    String dayOfWeek;

    @OneToOne(cascade = CascadeType.ALL)
    Address address;

    String repManner;

    public Long getId() {
        return id;
    }

    public String getRepManner() {
        return repManner;
    }

    public void setRepManner(String repManner) {
        this.repManner = repManner;
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

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    @Override
    public String toString() {
        return "RemedialClass{" +
                "id=" + id +
                ", lecturer=" + lecturer +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", dayOfWeek=" + dayOfWeek +
                ", address=" + address +
                '}';
    }
}
