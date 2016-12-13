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
import mx.edu.ittepic.proyectofinal.entities.Product;
import mx.edu.ittepic.proyectofinal.utis.Message;

/**
 *
 * @author VictorManuel
 */
@Stateless
public class ejbProducts {
    @PersistenceContext
    EntityManager entity;
    
    public String getProducts() {
        List<Product> listProducts;
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        Query q = entity.createNamedQuery("Product.findAll");
        listProducts = q.getResultList();

        String products = "[";
        for (Product listProduct : listProducts) {
            products = products + "{\"productid\":" + listProduct.getProductid() + ",\"productname\":\"" + listProduct.getProductname() + "\"" + ",\"salepricemay\":\"" + listProduct.getSalepricemay() +  "\"" +",\"currency\":\"" + listProduct.getCurrency() +  "\"" + ",\"image\":\"" + listProduct.getImage() + "\"},";
        }

        products = products.substring(0, products.length() - 1);
        products = products + "]";

        /*for(int i = 0; i < listRoles.size(); i++){
            listRoles.get(i).setUsersList(null);
        }*/
        m.setCode(200);
        m.setMsg(products);
        m.setDetail("OK");

        return gson.toJson(m);
    }
    
}
