/**
 * 
 */
package Ernest.Entity;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author Ernest
 *
 */
public class saOprole implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String sid;
	private String sname;
	private String sroleKind;
	private String smd5str;
	private String smd5str2;
	private String smd5str3;
	private String sparentRolesNames;
	private String sdescription;
	private Timestamp screateTime;
	private SaOppersonOprole saOppersonOprole;
	/**
	 * @return the sid
	 */
	public String getSid() {
		return sid;
	}
	/**
	 * @param sid the sid to set
	 */
	public void setSid(String sid) {
		this.sid = sid;
	}
	/**
	 * @return the sname
	 */
	public String getSname() {
		return sname;
	}
	/**
	 * @param sname the sname to set
	 */
	public void setSname(String sname) {
		this.sname = sname;
	}
	/**
	 * @return the sroleKind
	 */
	public String getSroleKind() {
		return sroleKind;
	}
	/**
	 * @param sroleKind the sroleKind to set
	 */
	public void setSroleKind(String sroleKind) {
		this.sroleKind = sroleKind;
	}
	/**
	 * @return the smd5str
	 */
	public String getSmd5str() {
		return smd5str;
	}
	/**
	 * @param smd5str the smd5str to set
	 */
	public void setSmd5str(String smd5str) {
		this.smd5str = smd5str;
	}
	/**
	 * @return the smd5str2
	 */
	public String getSmd5str2() {
		return smd5str2;
	}
	/**
	 * @param smd5str2 the smd5str2 to set
	 */
	public void setSmd5str2(String smd5str2) {
		this.smd5str2 = smd5str2;
	}
	/**
	 * @return the smd5str3
	 */
	public String getSmd5str3() {
		return smd5str3;
	}
	/**
	 * @param smd5str3 the smd5str3 to set
	 */
	public void setSmd5str3(String smd5str3) {
		this.smd5str3 = smd5str3;
	}
	/**
	 * @return the sparentRolesNames
	 */
	public String getSparentRolesNames() {
		return sparentRolesNames;
	}
	/**
	 * @param sparentRolesNames the sparentRolesNames to set
	 */
	public void setSparentRolesNames(String sparentRolesNames) {
		this.sparentRolesNames = sparentRolesNames;
	}
	/**
	 * @return the sdescription
	 */
	public String getSdescription() {
		return sdescription;
	}
	/**
	 * @param sdescription the sdescription to set
	 */
	public void setSdescription(String sdescription) {
		this.sdescription = sdescription;
	}
	/**
	 * @return the screateTime
	 */
	public Timestamp getScreateTime() {
		return screateTime;
	}
	/**
	 * @param screateTime the screateTime to set
	 */
	public void setScreateTime(Timestamp screateTime) {
		this.screateTime = screateTime;
	}
	/**
	 * @return the saOppersonOprole
	 */
	public SaOppersonOprole getSaOppersonOprole() {
		return saOppersonOprole;
	}
	/**
	 * @param saOppersonOprole the saOppersonOprole to set
	 */
	public void setSaOppersonOprole(SaOppersonOprole saOppersonOprole) {
		this.saOppersonOprole = saOppersonOprole;
	}
	
	
}
