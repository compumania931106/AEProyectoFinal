/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.edu.ittepic.proyectofinal.ejbs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;
import mx.edu.ittepic.proyectofinal.entities.Company;
import mx.edu.ittepic.proyectofinal.entities.Role;
import mx.edu.ittepic.proyectofinal.entities.Users;
import mx.edu.ittepic.proyectofinal.utis.Message;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author VictorManuel
 */
@Stateless
public class ejbContrasena {

    @PersistenceContext
    EntityManager entity;
    
    public String updateUserWithPassword(String userid, String username, String password, String phone,
            String neigborhood, String zipcode, String city, String country,
            String state, String region, String street, String email, String streetnumber,
            String photo, String cellphone, String companyid, String roleid, String gender){
    
        Message m = new Message();
        Users r = new Users();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        
        Company com = entity.find(Company.class, Integer.parseInt(companyid));
        Role rol = entity.find(Role.class, Integer.parseInt(roleid));
        
        try {
            Query q = entity.createNamedQuery("Users.updateUserWithPassword").
                    setParameter("username", username).
                    setParameter("password", password).
                    setParameter("phone", phone).
                    setParameter("neigborhood", neigborhood).
                    setParameter("zipcode", zipcode).
                    setParameter("city", city).
                    setParameter("country", country).
                    setParameter("state", state).
                    setParameter("region", region).
                    setParameter("street", street).
                    setParameter("email", email).
                    setParameter("streetnumber", streetnumber).
                    setParameter("photo", photo).
                    setParameter("cellphone", cellphone).
                    setParameter("companyid", com).
                    setParameter("roleid", rol).
                    setParameter("gender", gender.charAt(0)).
                    setParameter("userid", Integer.parseInt(userid));
            
            String pass = password;
            String passmd5 = DigestUtils.md5Hex(pass);

            
            Query a = entity.createNamedQuery("Users.updateUserWithPasswordE").
                    setParameter("username", username).
                    setParameter("password", passmd5).
                    setParameter("phone", phone).
                    setParameter("neigborhood", neigborhood).
                    setParameter("zipcode", zipcode).
                    setParameter("city", city).
                    setParameter("country", country).
                    setParameter("state", state).
                    setParameter("region", region).
                    setParameter("street", street).
                    setParameter("email", email).
                    setParameter("streetnumber", streetnumber).
                    setParameter("photo", photo).
                    setParameter("cellphone", cellphone).
                    setParameter("companyid", com).
                    setParameter("roleid", rol).
                    setParameter("gender", gender.charAt(0)).
                    setParameter("userid", Integer.parseInt(userid));
            
            

            if (q.executeUpdate() == 1 && a.executeUpdate() == 1) {
                m.setCode(200);
                m.setMsg("Se actualizo correctamente.");
                m.setDetail("OK");
            } else {
                m.setCode(404);
                m.setMsg("No se realizo la actualizacion");
                m.setDetail("");
            }

        } catch (IllegalStateException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (TransactionRequiredException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (QueryTimeoutException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (PersistenceException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
    
public String updateUserWithoutPassword(String userid, String username, String phone,
            String neigborhood, String zipcode, String city, String country,
            String state, String region, String street, String email, String streetnumber,
            String photo, String cellphone, String companyid, String roleid, String gender){
    
        Message m = new Message();
        Users r = new Users();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        
        Company com = entity.find(Company.class, Integer.parseInt(companyid));
        Role rol = entity.find(Role.class, Integer.parseInt(roleid));
        
        try {
            Query q = entity.createNamedQuery("Users.updateUserWithoutPassword").
                    setParameter("username", username).
                    setParameter("phone", phone).
                    setParameter("neigborhood", neigborhood).
                    setParameter("zipcode", zipcode).
                    setParameter("city", city).
                    setParameter("country", country).
                    setParameter("state", state).
                    setParameter("region", region).
                    setParameter("street", street).
                    setParameter("email", email).
                    setParameter("streetnumber", streetnumber).
                    setParameter("photo", photo).
                    setParameter("cellphone", cellphone).
                    setParameter("companyid", com).
                    setParameter("roleid", rol).
                    setParameter("gender", gender.charAt(0)).
                    setParameter("userid", Integer.parseInt(userid));

            if (q.executeUpdate() == 1) {
                m.setCode(200);
                m.setMsg("Se actualizo correctamente.");
                m.setDetail("OK");
            } else {
                m.setCode(404);
                m.setMsg("No se realizo la actualizacion");
                m.setDetail("");
            }

        } catch (IllegalStateException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (TransactionRequiredException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (QueryTimeoutException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        } catch (PersistenceException e) {
            m.setCode(404);
            m.setMsg("No se realizo la actualizacion");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
}
