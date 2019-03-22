package Ernest.Entity;



public class SaOppersonOprole implements java.io.Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String sid;
	private String userId;
	private String roleId;
	private String smd5str;
	private SaOporg saOporg;


	public SaOppersonOprole() {
	}

	public SaOppersonOprole(String sid) {
		this.sid = sid;
	}

	public SaOppersonOprole(String sid, String userId, String roleId, String smd5str) {
		this.sid = sid;
		this.userId = userId;
		this.roleId = roleId;
		this.smd5str = smd5str;
	}



	public String getSid() {
		return this.sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}


	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}


	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}


	public String getSmd5str() {
		return this.smd5str;
	}

	public void setSmd5str(String smd5str) {
		this.smd5str = smd5str;
	}
	
	/**
	 * @return the saOporg
	 */
	public SaOporg getSaOporg() {
		return saOporg;
	}

	/**
	 * @param saOporg the saOporg to set
	 */
	public void setSaOporg(SaOporg saOporg) {
		this.saOporg = saOporg;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "SaOppersonOprole [sid=" + sid + ", userId=" + userId + ", roleId=" + roleId + ", smd5str=" + smd5str
				+ ", saOporg=" + saOporg + "]";
	}

	
	
	
}