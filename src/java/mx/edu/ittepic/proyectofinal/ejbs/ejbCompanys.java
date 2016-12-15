/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.edu.ittepic.proyectofinal.ejbs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import mx.edu.ittepic.proyectofinal.entities.Company;
import mx.edu.ittepic.proyectofinal.utis.Message;

/**
 *
 * @author VictorManuel
 */
@Stateless
public class ejbCompanys {

     @PersistenceContext
    EntityManager entity;
    
    public String getCompanys(){
        List<Company> listCompanys;
        Message m = new Message();
        String msg = "";
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        
        Company company;
        
        try {
            Query q = entity.createNamedQuery("Company.findAll");
            listCompanys = q.getResultList();

            
            for(int i = 0; i < listCompanys.size(); i++){
                company = listCompanys.get(i);
                company.setUsersList(null);
            }
            
            msg = gson.toJson(listCompanys);
            
            m.setCode(200);
            m.setMsg(msg);
            m.setDetail("OK");
        } catch (IllegalArgumentException e) {
            m.setCode(501);
            m.setMsg("Error al consultar los registros");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
}
