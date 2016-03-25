package repository;

import entity.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturersRepository extends JpaRepository<Lecturer, Long>{
}
