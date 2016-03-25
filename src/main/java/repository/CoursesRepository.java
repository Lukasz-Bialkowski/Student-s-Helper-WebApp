package repository;

import entity.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursesRepository extends JpaRepository<CourseClass, Long>{
}
