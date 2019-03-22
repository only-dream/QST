package Ernest.Entity;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * SaOporg entity. @author MyEclipse Persistence Tools
 */


public class SaOporg implements Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String sid;
	private String sname;
	private String sfname;
	private String smd5str;
	private String smd5str3;
	private Timestamp screateTime;
	private String sorgKindId;
	private String sparentId;
	private String sparentId2;
	private String sphone;
	private String saddress;
	private String sdescription;
	private String spersonId;
	private String snodeKind;
	private String smd5str2;
	private String fimage;

	public SaOporg() {
	}

	public SaOporg(String sid) {
		this.sid = sid;
	}

	public SaOporg(String sid, String sname, String sfname, String smd5str, String smd5str3, Timestamp screateTime,
			String sorgKindId, String sparentId, String sparentId2, String sphone, String saddress, String sdescription,
			String spersonId, String snodeKind, String smd5str2, String fimage) {
		this.sid = sid;
		this.sname = sname;
		this.sfname = sfname;
		this.smd5str = smd5str;
		this.smd5str3 = smd5str3;
		this.screateTime = screateTime;
		this.sorgKindId = sorgKindId;
		this.sparentId = sparentId;
		this.sparentId2 = sparentId2;
		this.sphone = sphone;
		this.saddress = saddress;
		this.sdescription = sdescription;
		this.spersonId = spersonId;
		this.snodeKind = snodeKind;
		this.smd5str2 = smd5str2;
		this.fimage = fimage;
	}



	public String getSid() {
		return this.sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}


	public String getSname() {
		return this.sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}


	public String getSfname() {
		return this.sfname;
	}

	public void setSfname(String sfname) {
		this.sfname = sfname;
	}


	public String getSmd5str() {
		return this.smd5str;
	}

	public void setSmd5str(String smd5str) {
		this.smd5str = smd5str;
	}


	public String getSmd5str3() {
		return this.smd5str3;
	}

	public void setSmd5str3(String smd5str3) {
		this.smd5str3 = smd5str3;
	}


	public Timestamp getScreateTime() {
		return this.screateTime;
	}

	public void setScreateTime(Timestamp screateTime) {
		this.screateTime = screateTime;
	}


	public String getSorgKindId() {
		return this.sorgKindId;
	}

	public void setSorgKindId(String sorgKindId) {
		this.sorgKindId = sorgKindId;
	}


	public String getSparentId() {
		return this.sparentId;
	}

	public void setSparentId(String sparentId) {
		this.sparentId = sparentId;
	}


	public String getSparentId2() {
		return this.sparentId2;
	}

	public void setSparentId2(String sparentId2) {
		this.sparentId2 = sparentId2;
	}


	public String getSphone() {
		return this.sphone;
	}

	public void setSphone(String sphone) {
		this.sphone = sphone;
	}


	public String getSaddress() {
		return this.saddress;
	}

	public void setSaddress(String saddress) {
		this.saddress = saddress;
	}


	public String getSdescription() {
		return this.sdescription;
	}

	public void setSdescription(String sdescription) {
		this.sdescription = sdescription;
	}


	public String getSpersonId() {
		return this.spersonId;
	}

	public void setSpersonId(String spersonId) {
		this.spersonId = spersonId;
	}


	public String getSnodeKind() {
		return this.snodeKind;
	}

	public void setSnodeKind(String snodeKind) {
		this.snodeKind = snodeKind;
	}


	public String getSmd5str2() {
		return this.smd5str2;
	}

	public void setSmd5str2(String smd5str2) {
		this.smd5str2 = smd5str2;
	}


	public String getFimage() {
		return this.fimage;
	}

	public void setFimage(String fimage) {
		this.fimage = fimage;
	}

}