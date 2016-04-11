package entity;

/**
 * Created by user on 2016-04-10.
 */
public class RemedialInfo {

    RemedialClass remedialClass;
    Address address;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public RemedialClass getRemedialClass() {

        return remedialClass;
    }

    public void setRemedialClass(RemedialClass remedialClass) {
        this.remedialClass = remedialClass;
    }

    @Override
    public String toString() {
        return "RemedialInfo{" +
                "remedialClass=" + remedialClass +
                ", address=" + address +
                '}';
    }
}
