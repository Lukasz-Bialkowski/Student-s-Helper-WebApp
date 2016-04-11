package entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Address {

    @Id
    @GeneratedValue
    Long id;

    String sala;
    String budynek;

    String width;
    String length;
    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getBudynek() {
        return budynek;
    }

    public void setBudynek(String budynek) {
        this.budynek = budynek;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", sala='" + sala + '\'' +
                ", budynek='" + budynek + '\'' +
                ", width='" + width + '\'' +
                ", length='" + length + '\'' +
                '}';
    }
}
