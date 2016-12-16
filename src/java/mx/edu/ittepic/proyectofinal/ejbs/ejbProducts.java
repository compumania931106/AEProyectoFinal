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
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;
import javax.persistence.Query;
import javax.persistence.QueryTimeoutException;
import javax.persistence.TransactionRequiredException;
import mx.edu.ittepic.proyectofinal.entities.Category;
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
            products = products + "{\"productid\":" + listProduct.getProductid() + ",\"productname\":\"" + listProduct.getProductname() + "\"" + ",\"salepricemay\":\"" + listProduct.getSalepricemay() + "\"" + ",\"currency\":\"" + listProduct.getCurrency() + "\"" + ",\"image\":\"" + listProduct.getImage() + "\"},";
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

    public String getProductsAll() {
        List<Product> listProducts;
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();
        String msg = "";

        Query q = entity.createNamedQuery("Product.findAll");
        listProducts = q.getResultList();

        Product product;

        for (int i = 0; i < listProducts.size(); i++) {
            product = listProducts.get(i);
            product.getCategoryid().setProductList(null);
        }

        msg = gson.toJson(listProducts);

        m.setCode(200);
        m.setMsg(msg);
        m.setDetail("OK");

        return gson.toJson(m);
    }

    public String newProduct(String code, String productname, String brand,
            String purchprice, String stock, String salepricemin,
            String reorderpoint, String currency, String salepricemay,
            String categoryid) {

        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Category cat = entity.find(Category.class, Integer.parseInt(categoryid));

            Product p = new Product();
            p.setCode(code);
            p.setProductname(productname);
            p.setBrand(brand);
            p.setPurchprice(Double.parseDouble(purchprice));
            p.setStock(Integer.parseInt(stock));
            p.setSalepricemin(Double.parseDouble(salepricemin));
            p.setReorderpoint(Integer.parseInt(reorderpoint));
            p.setCurrency(currency);
            p.setSalepricemay(Double.parseDouble(salepricemay));
            p.setCategoryid(cat);
            p.setImage("0x16");

            entity.persist(p);
            entity.flush();

            m.setCode(200);
            m.setMsg("Se inserto correctamente");
            m.setDetail(p.getProductid().toString());

        } catch (IllegalArgumentException e) {
            m.setCode(503);
            m.setMsg("Error en la base de datos");
            m.setDetail(e.getMessage());
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

    public String updateURLImage(String productid, String image) {
        Message m = new Message();
        Product p = new Product();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Query q = entity.createNamedQuery("Product.updateURL").
                    setParameter("image", image).
                    setParameter("productid", Integer.parseInt(productid));

            //Query q = entity.createNativeQuery("UPDATE Role SET rolename = '"+ name +"' WHERE roleid = "+ rolid +";");
            if (q.executeUpdate() == 1) {
                m.setCode(200);
                m.setMsg("Se actualizo correctamente.");
                m.setDetail("OK");
            } else {
                m.setCode(404);
                m.setMsg("No se realizo la actualizacion");
                m.setDetail("");
            }

        } catch (TransactionRequiredException e) {

        }
        return gson.toJson(m);
    }

    
    public String deleteProduct(String productid) {
        Message m = new Message();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            Query q = entity.createNamedQuery("Product.deleteProduct").
                    setParameter("productid", Integer.parseInt(productid));

            if (q.executeUpdate() == 1) {
                m.setCode(200);
                m.setMsg("Se elimino correctamente.");
                m.setDetail("OK");
            } else {
                m.setCode(404);
                m.setMsg("No se realizo la eliminacion");
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
    
        public String getProductByID(String productid) {
        Message m = new Message();
        Product product = new Product();
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {

            Query q = entity.createNamedQuery("Product.findByProductid").setParameter("productid", Integer.parseInt(productid));
            product = (Product) q.getSingleResult();

            m.setCode(200);
            m.setMsg(gson.toJson(product));
            m.setDetail("OK");
        } catch (Exception e) {
            m.setCode(404);
            m.setMsg("No se encontro el registro");
            m.setDetail(e.toString());
        }
        return gson.toJson(m);
    }
}
