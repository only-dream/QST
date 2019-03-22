package Ernest.Entity;



/**
 * SaFunction entity. @author MyEclipse Persistence Tools
 */

public class SaFunction implements java.io.Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	@Override
	public String toString() {
		return "SaFunction [sid=" + sid + ", sname=" + sname + ", surl=" + surl + ", isShow=" + isShow + ", roleId="
				+ roleId + ", sicon=" + sicon + ", companyId=" + companyId + ", sorder=" + sorder + ", stype=" + stype
				+ "]";
	}

	private String sid;
	private String sname;
	private String surl;
	private Short isShow;
	private String roleId;
	private String sicon;
	private String companyId;
	private Integer sorder;
	private String stype;


	public SaFunction() {
	}

	public SaFunction(String sid) {
		this.sid = sid;
	}

	public SaFunction(String sid, String sname, String surl, Short isShow, String roleId, String sicon,
			String companyId, Integer sorder, String stype) {
		this.sid = sid;
		this.sname = sname;
		this.surl = surl;
		this.isShow = isShow;
		this.roleId = roleId;
		this.sicon = sicon;
		this.companyId = companyId;
		this.sorder = sorder;
		this.stype = stype;
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


	public String getSurl() {
		return this.surl;
	}

	public void setSurl(String surl) {
		this.surl = surl;
	}


	public Short getIsShow() {
		return this.isShow;
	}

	public void setIsShow(Short isShow) {
		this.isShow = isShow;
	}


	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}


	public String getSicon() {
		return this.sicon;
	}

	public void setSicon(String sicon) {
		this.sicon = sicon;
	}


	public String getCompanyId() {
		return this.companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}


	public Integer getSorder() {
		return this.sorder;
	}

	public void setSorder(Integer sorder) {
		this.sorder = sorder;
	}


	public String getStype() {
		return this.stype;
	}

	public void setStype(String stype) {
		this.stype = stype;
	}

}