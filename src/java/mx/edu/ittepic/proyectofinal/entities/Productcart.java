/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.edu.ittepic.proyectofinal.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author VictorManuel
 */
@Entity
@Table(name = "productcart")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Productcart.findAll", query = "SELECT p FROM Productcart p"),
    @NamedQuery(name = "Productcart.findByProductcartid", query = "SELECT p FROM Productcart p WHERE p.productcartid = :productcartid"),
    @NamedQuery(name = "Productcart.findByUserid", query = "SELECT p FROM Productcart p WHERE p.userid = :userid"),
    @NamedQuery(name = "Productcart.findByProductid", query = "SELECT p FROM Productcart p WHERE p.productid = :productid"),
    @NamedQuery(name = "Productcart.findByQuantity", query = "SELECT p FROM Productcart p WHERE p.quantity = :quantity")})
public class Productcart implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "productcartid")
    private Integer productcartid;
    @Basic(optional = false)
    @NotNull
    @Column(name = "userid")
    private int userid;
    @Basic(optional = false)
    @NotNull
    @Column(name = "productid")
    private int productid;
    @Basic(optional = false)
    @NotNull
    @Column(name = "quantity")
    private int quantity;
    @JoinColumn(name = "product_productid", referencedColumnName = "productid")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Product productProductid;
    @JoinColumn(name = "users_userid", referencedColumnName = "userid")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Users usersUserid;

    public Productcart() {
    }

    public Productcart(Integer productcartid) {
        this.productcartid = productcartid;
    }

    public Productcart(Integer productcartid, int userid, int productid, int quantity) {
        this.productcartid = productcartid;
        this.userid = userid;
        this.productid = productid;
        this.quantity = quantity;
    }

    public Integer getProductcartid() {
        return productcartid;
    }

    public void setProductcartid(Integer productcartid) {
        this.productcartid = productcartid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProductProductid() {
        return productProductid;
    }

    public void setProductProductid(Product productProductid) {
        this.productProductid = productProductid;
    }

    public Users getUsersUserid() {
        return usersUserid;
    }

    public void setUsersUserid(Users usersUserid) {
        this.usersUserid = usersUserid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (productcartid != null ? productcartid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Productcart)) {
            return false;
        }
        Productcart other = (Productcart) object;
        if ((this.productcartid == null && other.productcartid != null) || (this.productcartid != null && !this.productcartid.equals(other.productcartid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mx.edu.ittepic.proyectofinal.entities.Productcart[ productcartid=" + productcartid + " ]";
    }
    
}
