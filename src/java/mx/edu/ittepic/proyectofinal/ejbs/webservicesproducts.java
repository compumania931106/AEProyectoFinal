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
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import mx.edu.ittepic.proyectofinal.entities.Product;
import mx.edu.ittepic.proyectofinal.entities.Role;
import mx.edu.ittepic.proyectofinal.entities.Users;
import mx.edu.ittepic.proyectofinal.utis.Message;

/**
 *
 * @author VictorManuel
 */
@Stateless
@Path("/products")
public class webservicesproducts {

    @PersistenceContext
    private EntityManager entity;

    @GET
    @Path("/list/{apikey}")
    @Produces({MediaType.TEXT_PLAIN})
    public String getLogin(@PathParam("apikey") String apikey) {
        List<Product> listProducts;
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Users users;
            Query u = entity.createNamedQuery("Users.findByApikey").setParameter("apikey", apikey);
            users = (Users) u.getSingleResult();
            Role role = users.getRoleid();

            if (role.getRoleid() == 3) {
                Query q = entity.createNamedQuery("Product.findAll");
                listProducts = q.getResultList();

                String products = "[";
                for (Product listProduct : listProducts) {
                    products = products + "{\"productid\":" + listProduct.getProductid() + ",\"productname\":\"" + listProduct.getProductname() + "\"" + ",\"salepricemay\":\"" + listProduct.getSalepricemay() +  "\"" +",\"currency\":\"" + listProduct.getCurrency() +  "\"" + ",\"image\":\"" + listProduct.getImage() + "\"},";
                }
                products = products.substring(0, products.length() - 1);
                products = products + "]";

                m.setCode(200);
                m.setMsg(products);
                m.setDetail("OK");
            } else {
                m.setCode(401);
                m.setMsg("No tiene acceso a este recurso");
                m.setDetail("OK");
            }

        } catch (Exception e) {
            m.setCode(500);
            m.setMsg("No tiene acceso a este recurso");
            m.setDetail(e.getMessage());
        }

        return gson.toJson(m);
    }
}
