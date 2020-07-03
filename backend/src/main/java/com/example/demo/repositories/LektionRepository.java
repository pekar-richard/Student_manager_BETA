package com.example.demo.repositories;


import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Lektion;

@Repository
public interface LektionRepository extends CrudRepository<Lektion,Long>{
	
	Iterable<Lektion> findAll(Sort sort);
	
	@Query("from Lektion where lektion_index=:Lektion_index")  
	public Lektion findLektionByID(@Param("Lektion_index") long u);
	
	@Query("from Lektion where lektion_student=:Student_index")
	public List<Lektion> findLektionByStudentID(@Param("Student_index") long u);
}
