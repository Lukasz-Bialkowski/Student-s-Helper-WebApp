package repository;

import entity.Building.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingsRepository extends JpaRepository<Building, Long>{
}
