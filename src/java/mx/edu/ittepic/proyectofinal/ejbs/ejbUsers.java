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
import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;
import javax.validation.ConstraintViolationException;
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
public class ejbUsers {

    @PersistenceContext
    EntityManager entity;

    public String getUser(String username, String password) {
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        String md5= DigestUtils.md5Hex(password);
        try {
            Users users;
            Query q = entity.createNamedQuery("Users.getUser").setParameter("username", username).setParameter("password", md5);

            users = (Users) q.getSingleResult();
            
            Role role = users.getRoleid();
            
            m.setCode(200);
            m.setMsg("Tiene acceso al sistema");
            m.setDetail(users.getUsername() + ":" + users.getApikey() + ":" + role.getRoleid());

        } catch (NoResultException e) {
            m.setCode(401);
            m.setMsg("No tiene acceso al sistema");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
    
    public String newUser(String username, String password, String phone,
            String neigborhood, String zipcode, String city, String country,
            String state, String region, String street, String email, String streetnumber,
            String photo, String cellphone, String companyid, String roleid, String gender) {

        Message m = new Message();
        Users u = new Users();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        Company com = entity.find(Company.class, Integer.parseInt(companyid));
        Role rol = entity.find(Role.class, Integer.parseInt(roleid));

        try {
            String cadenaoriginal = password;
            String md5= DigestUtils.md5Hex(cadenaoriginal);
            
            u.setUsername(username);
            u.setPassword(md5);
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
        } catch(ConstraintViolationException e){
            m.setCode(400);
            m.setMsg("Hubo problemas con la base de datos");
            m.setDetail(e.getConstraintViolations().toString());
        }
        
        return gson.toJson(m);
    }
    
    public String updateUser(String userid, String apikey){
    
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
                   setParameter("apikey", md5).setParameter("userid", Integer.parseInt(userid));
            
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
    
    public String GetUsers(){
        List<Users> listUsers;
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        String msg = "";
        
        try {
            Query q = entity.createNamedQuery("Users.findAll");
            listUsers = q.getResultList();
            
            Users users;
            
            for(int i = 0; i< listUsers.size(); i++){
                users = listUsers.get(i);
                users.getCompanyid().setUsersList(null);
                users.getRoleid().setUsersList(null);
            }
            
            msg = gson.toJson(listUsers);

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
    
    public String GetUserByID(String userid){
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Users users;
            Query q = entity.createNamedQuery("Users.findByUserid").setParameter("userid", Integer.parseInt(userid));

            users = (Users) q.getSingleResult();

          
            users.setSaleList(null);

            m.setCode(200);
            m.setMsg(gson.toJson(users));
            m.setDetail("OK");
        } catch (NoResultException e) {
            m.setCode(404);
            m.setMsg("No se encontro el registro");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
    
    public String getCompanyidByUserID(String userid){
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Users users;
            Query q = entity.createNamedQuery("Users.findCompanyid").setParameter("userid", Integer.parseInt(userid));

            users = (Users) q.getSingleResult();

           m.setCode(200);
            m.setMsg(gson.toJson(users));
            m.setDetail("OK");
        } catch (Exception e) {
            m.setCode(404);
            m.setMsg("No se encontro el registro");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    
    }
    
public String checkPass(String username, String password){
         
       Message m = new Message();
       GsonBuilder builder = new GsonBuilder();
       Gson gson = builder.create();
       
        
        try {
            Users user;
            Query q = entity.createNamedQuery("Users.check").
                    setParameter("username", username).
                    setParameter("password", password);
           
            user = (Users) q.getSingleResult();  
                  
            m.setCode(200);
            m.setMsg("El usuario y la contraseña son correctos");
            m.setDetail("OK");
          
        } catch (NoResultException e) {
            m.setCode(208);
            m.setMsg("Usuario o contraseña incorrectos");
            m.setDetail(e.toString());
        } catch (StackOverflowError e) {
            m.setCode(200);
            m.setMsg("El usuario y la contraseña son correctos");
            m.setDetail("OK");
        }
        return gson.toJson(m);
    }

public String deleteUser(String userid){
    Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            String info = this.GetUserByID(userid);
            boolean resultado = info.contains("OK");
            if (resultado) {
                Users r = entity.find(Users.class, Integer.parseInt(userid));
                entity.remove(r);
                m.setCode(200);
                m.setMsg("Registro Eliminado correctamente");
                m.setDetail("OK");
            } else {
                m.setCode(404);
                m.setMsg("No se encontro el registro");
                m.setDetail("");
            }
        } catch (IllegalArgumentException e) {
            m.setCode(404);
            m.setMsg("No se encontro el registro");
            m.setDetail(e.toString());
        } catch (TransactionRequiredException e) {
            m.setCode(404);
            m.setMsg("No se encontro el registro");
            m.setDetail(e.toString());
        }

        return gson.toJson(m);
}

}
