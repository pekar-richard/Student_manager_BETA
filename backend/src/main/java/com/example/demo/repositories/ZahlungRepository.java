package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.domain.Zahlung;

@Repository
public interface ZahlungRepository extends CrudRepository<Zahlung,Long>{
	
	@Override
	Iterable<Zahlung> findAll();
	
	@Query("from Zahlung where zahlung_index=:Zahlung_index")  
	public Zahlung findZahlungByID(@Param("Zahlung_index") long u);
	
	@Query("from Zahlung where zahlung_student=:Student_index")
	public List<Zahlung> findZahlungByStudentID(@Param("Student_index") long u);
	 
	//@Transactional
	//@Modifying
	//@Query("SELECT z FROM Zahlung z LEFT JOIN z.student s WHERE z.student.studentIndex = :Student_index and s.agentur.agenturIndex = :Agentur_index")
	//public List<Zahlung> findZahlungByStudentAndAgentur(@Param("Student_index") long u, @Param("Agentur_index") long a);
	
	
	@Query("from Zahlung where zahlung_student=:Student_index and zahlung_agentur=:Agentur_index")
	public List<Zahlung> findZahlungByStudentAndAgentur(@Param("Student_index") long u, @Param("Agentur_index") long a);
}