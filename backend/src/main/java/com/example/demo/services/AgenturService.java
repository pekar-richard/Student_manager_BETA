package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Agentur;
import com.example.demo.domain.Lektion;
import com.example.demo.domain.Rechnung;
import com.example.demo.domain.Student;
import com.example.demo.domain.Zahlung;
import com.example.demo.exceptions.AgenturNotFoundException;
import com.example.demo.repositories.AgenturRepository;

@Service
public class AgenturService {
	
	@Autowired
	private AgenturRepository agenturRepository;
	
	public Iterable<Agentur> findAllAgenturs(){
		
		return agenturRepository.findAll();			
	}
	
	public Agentur findAgenturByID(long agentur_id) {
		
		Agentur theAgentur = agenturRepository.findAgenturByID(agentur_id);
				
			if(theAgentur == null) {	
				throw new AgenturNotFoundException("Die Agentur ID: '"+ agentur_id + "'is nicht vorhanden.");
			}
		
		return theAgentur;	
	}
	
	public Agentur saveOrUpdateAgentur(Agentur agentur) {
	
	try {	
		
		if(agentur.getAgenturIndex() == null) {
			
			return agenturRepository.save(agentur);
			
		}else {
		
			Agentur theAgentur = findAgenturByID(agentur.getAgenturIndex());
				if(theAgentur == null) {	
					throw new AgenturNotFoundException("Die Agentur ID: '"+ agentur.getAgenturIndex() + "'is nicht vorhanden.");
				}
		
			return	agenturRepository.save(agentur);
			
		}	
			
	}catch (AgenturNotFoundException e){			
		throw e;
		}catch (Exception e){			
		throw new AgenturNotFoundException("Die Agentur ID: '"+ agentur.getAgenturIndex() + "'is nicht vorhanden.");
	}

	}
	
	public void deleteAgenturById(long agentur_id) {
		
		
	Agentur theAgentur = agenturRepository.findAgenturByID(agentur_id);
	
	if(theAgentur == null) {
		
		throw new AgenturNotFoundException("Die Agentur ID: '"+ agentur_id + "'is nicht vorhanden.");
	}
		
	List<Student>  agenturStudents = theAgentur.getStudents();
	List<Lektion>  agenturLektions = theAgentur.getLektions();
	List<Rechnung> agenturRechnungs = theAgentur.getRechnungs();
	List<Zahlung> agenturZahlungs = theAgentur.getZahlungs();
	
	agenturStudents.forEach((n) ->  {n.removeAgentur();});
	agenturLektions.forEach((n) ->  {n.removeAgentur();});
	agenturRechnungs.forEach((n) -> {n.removeAgentur();});
	agenturZahlungs.forEach((n) -> {n.removeAgentur();});

	agenturRepository.delete(theAgentur);
	
	}
	
}
