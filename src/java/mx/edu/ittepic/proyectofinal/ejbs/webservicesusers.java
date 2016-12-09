/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.edu.ittepic.proyectofinal.ejbs;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import javax.ejb.Stateless;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
@Path("/users")
public class webservicesusers {

    @PersistenceContext
    private EntityManager entity;

    @GET
    @Path("/login/{usermame}/{password}")
    @Produces({MediaType.TEXT_PLAIN})
    public String getLogin(@PathParam("usermame") String username, @PathParam("password") String password) {
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        
        try {
            Users users;
            Query q = entity.createNamedQuery("Users.getUser").setParameter("username", username).setParameter("password", password);

            users = (Users) q.getSingleResult();
            users.setSaleList(null);

            m.setCode(200);
            m.setMsg("Si tiene acceso al sistema");
            m.setDetail(users.getApikey());

        } catch (NoResultException e) {
            m.setCode(401);
            m.setMsg("No tiene acceso al sistema");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
    
    
   @POST
   @Path("/adduser/{username}/{password}/{phone}/{neigborhood}/{zipcode}/{city}/{country}/{state}/{region}/{street}/{email}/{streetnumber}/{photo}/{cellphone}/{companyid}/{roleid}/{gender}")
   @Produces({MediaType.TEXT_PLAIN})
   public String newUser(@PathParam("username") String username, @PathParam("password") String password, @PathParam("phone") String phone,
             @PathParam("neigborhood") String neigborhood, @PathParam("zipcode") String zipcode, @PathParam("city") String city, @PathParam("contry") String country,
            @PathParam("state") String state, @PathParam("region") String region, @PathParam("street") String street, @PathParam("email") String email, @PathParam("streetnumber") String streetnumber,
             @PathParam("photo") String photo, @PathParam("cellphone") String cellphone, @PathParam("companyid") String companyid, @PathParam("roleid") String roleid, @PathParam("gender") String gender) {

        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();


        try {
       
       
        Users u = new Users();
        Company com = entity.find(Company.class, Integer.parseInt(companyid));
        Role rol = entity.find(Role.class, Integer.parseInt(roleid));
        
       u.setUsername(username);
            u.setPassword(password);
            u.setPhone(phone);
            u.setNeigborhood(neigborhood);
            u.setZipcode(zipcode);
            u.setCity(city);
            u.setCountry(country);
            u.setState(state);
            u.setRegion(region);
            u.setStreet(street);
            u.setEmail(email);
            u.setStreetnumber(streetnumber);
            u.setPhoto(photo);
            u.setCellphone(cellphone);
            u.setCompanyid(com);
            u.setRoleid(rol);
            u.setGender(gender.charAt(0));
            u.setApikey("off");

            entity.persist(u);
            entity.flush();
            
            updateUser(u.getUserid().toString(), u.getApikey());

            m.setCode(200);
            m.setMsg("El usuario se ha registro correctamente");
            m.setDetail(u.getUserid().toString());

        } catch (IllegalArgumentException e) {
            m.setCode(503);
            m.setMsg("Error en la base de datos");
            m.setDetail(e.toString());
        } catch (TransactionRequiredException e) {
            m.setCode(503);
            m.setMsg("Error en la transaccion con la base de datos");
            m.setDetail(e.toString());
        } catch (EntityExistsException e) {
            m.setCode(400);
            m.setMsg("Hubo problemas con la base de datos");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
   
   
       
     public String updateUser(@PathParam("username") String userid, @PathParam("apikey") String apikey){
    
        Message m = new Message();
        Users r = new Users();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        try {
            Query q = entity.createNamedQuery("Users.updateUser").
       
                    setParameter("apikey", apikey).
                    setParameter("userid", Integer.parseInt(userid));
            
                    String idapi = userid;
                    String md5 = DigestUtils.md5Hex(idapi);

           Query a = entity.createNamedQuery("Users.updateUserE").
                   setParameter("apikey", userid).setParameter("userid", Integer.parseInt(userid));
            
            if (q.executeUpdate() == 1 && a.executeUpdate()==1) {
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
