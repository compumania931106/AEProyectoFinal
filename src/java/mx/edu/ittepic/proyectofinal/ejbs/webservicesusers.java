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
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import mx.edu.ittepic.proyectofinal.entities.Users;
import mx.edu.ittepic.proyectofinal.utis.Message;

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
            m.setDetail("OK");

        } catch (NoResultException e) {
            m.setCode(401);
            m.setMsg("No tiene acceso al sistema");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }

}
