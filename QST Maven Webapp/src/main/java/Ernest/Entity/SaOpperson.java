package Ernest.Entity;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;


public class SaOpperson implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String sid;//
	private String sname;//
	private String sidcard;//
	private Integer sage;
	private String sloginName;//
	private String spassword;//
	private Short loginCount;
	private String smd5str;//
	private String smd5str2;
	private String smd5str3;
	private String smainOrgId;//
	private String smainOrgName;
	private String sworkType;//
	private String shealthStatus;//
	private String ssex;//
	private Date sbirthday;
	private Date strainDate;
	private Float sexamScore;//
	private String sfamilyAddress;//
	private String sposition;
	private String spositionName;
	private String smobilePhone;//
	private String sdeptId;//
	private String schineseFirstPy;//
	private String sorgKindId;//
	private String fimage;//
	private String scertificate;
	private Timestamp sjoinDate;
	private String staffId;
	private String deptName;
	private String orgName;
	private String deptId;
	private String orgId;
	private Integer ffaceState;
	private SaOporg saOporg;

	public SaOpperson() {
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "SaOpperson [sid=" + sid + ", sname=" + sname + ", sidcard=" + sidcard + ", sage=" + sage
				+ ", sloginName=" + sloginName + ", spassword=" + spassword + ", loginCount=" + loginCount
				+ ", smd5str=" + smd5str + ", smd5str2=" + smd5str2 + ", smd5str3=" + smd5str3 + ", smainOrgId="
				+ smainOrgId + ", smainOrgName=" + smainOrgName + ", sworkType=" + sworkType + ", shealthStatus="
				+ shealthStatus + ", ssex=" + ssex + ", sbirthday=" + sbirthday + ", strainDate=" + strainDate
				+ ", sexamScore=" + sexamScore + ", sfamilyAddress=" + sfamilyAddress + ", sposition=" + sposition
				+ ", spositionName=" + spositionName + ", smobilePhone=" + smobilePhone + ", sdeptId=" + sdeptId
				+ ", schineseFirstPy=" + schineseFirstPy + ", sorgKindId=" + sorgKindId + ", fimage=" + fimage
				+ ", scertificate=" + scertificate + ", sjoinDate=" + sjoinDate + ", staffId=" + staffId + ", deptName="
				+ deptName + ", orgName=" + orgName + ", deptId=" + deptId + ", orgId=" + orgId + ", ffaceState="
				+ ffaceState + ", saOporg=" + saOporg + "]";
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((deptId == null) ? 0 : deptId.hashCode());
		result = prime * result + ((deptName == null) ? 0 : deptName.hashCode());
		result = prime * result + ((ffaceState == null) ? 0 : ffaceState.hashCode());
		result = prime * result + ((fimage == null) ? 0 : fimage.hashCode());
		result = prime * result + ((loginCount == null) ? 0 : loginCount.hashCode());
		result = prime * result + ((orgId == null) ? 0 : orgId.hashCode());
		result = prime * result + ((orgName == null) ? 0 : orgName.hashCode());
		result = prime * result + ((saOporg == null) ? 0 : saOporg.hashCode());
		result = prime * result + ((sage == null) ? 0 : sage.hashCode());
		result = prime * result + ((sbirthday == null) ? 0 : sbirthday.hashCode());
		result = prime * result + ((scertificate == null) ? 0 : scertificate.hashCode());
		result = prime * result + ((schineseFirstPy == null) ? 0 : schineseFirstPy.hashCode());
		result = prime * result + ((sdeptId == null) ? 0 : sdeptId.hashCode());
		result = prime * result + ((sexamScore == null) ? 0 : sexamScore.hashCode());
		result = prime * result + ((sfamilyAddress == null) ? 0 : sfamilyAddress.hashCode());
		result = prime * result + ((shealthStatus == null) ? 0 : shealthStatus.hashCode());
		result = prime * result + ((sid == null) ? 0 : sid.hashCode());
		result = prime * result + ((sidcard == null) ? 0 : sidcard.hashCode());
		result = prime * result + ((sjoinDate == null) ? 0 : sjoinDate.hashCode());
		result = prime * result + ((sloginName == null) ? 0 : sloginName.hashCode());
		result = prime * result + ((smainOrgId == null) ? 0 : smainOrgId.hashCode());
		result = prime * result + ((smainOrgName == null) ? 0 : smainOrgName.hashCode());
		result = prime * result + ((smd5str == null) ? 0 : smd5str.hashCode());
		result = prime * result + ((smd5str2 == null) ? 0 : smd5str2.hashCode());
		result = prime * result + ((smd5str3 == null) ? 0 : smd5str3.hashCode());
		result = prime * result + ((smobilePhone == null) ? 0 : smobilePhone.hashCode());
		result = prime * result + ((sname == null) ? 0 : sname.hashCode());
		result = prime * result + ((sorgKindId == null) ? 0 : sorgKindId.hashCode());
		result = prime * result + ((spassword == null) ? 0 : spassword.hashCode());
		result = prime * result + ((sposition == null) ? 0 : sposition.hashCode());
		result = prime * result + ((spositionName == null) ? 0 : spositionName.hashCode());
		result = prime * result + ((ssex == null) ? 0 : ssex.hashCode());
		result = prime * result + ((staffId == null) ? 0 : staffId.hashCode());
		result = prime * result + ((strainDate == null) ? 0 : strainDate.hashCode());
		result = prime * result + ((sworkType == null) ? 0 : sworkType.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SaOpperson other = (SaOpperson) obj;
		if (deptId == null) {
			if (other.deptId != null)
				return false;
		} else if (!deptId.equals(other.deptId))
			return false;
		if (deptName == null) {
			if (other.deptName != null)
				return false;
		} else if (!deptName.equals(other.deptName))
			return false;
		if (ffaceState == null) {
			if (other.ffaceState != null)
				return false;
		} else if (!ffaceState.equals(other.ffaceState))
			return false;
		if (fimage == null) {
			if (other.fimage != null)
				return false;
		} else if (!fimage.equals(other.fimage))
			return false;
		if (loginCount == null) {
			if (other.loginCount != null)
				return false;
		} else if (!loginCount.equals(other.loginCount))
			return false;
		if (orgId == null) {
			if (other.orgId != null)
				return false;
		} else if (!orgId.equals(other.orgId))
			return false;
		if (orgName == null) {
			if (other.orgName != null)
				return false;
		} else if (!orgName.equals(other.orgName))
			return false;
		if (saOporg == null) {
			if (other.saOporg != null)
				return false;
		} else if (!saOporg.equals(other.saOporg))
			return false;
		if (sage == null) {
			if (other.sage != null)
				return false;
		} else if (!sage.equals(other.sage))
			return false;
		if (sbirthday == null) {
			if (other.sbirthday != null)
				return false;
		} else if (!sbirthday.equals(other.sbirthday))
			return false;
		if (scertificate == null) {
			if (other.scertificate != null)
				return false;
		} else if (!scertificate.equals(other.scertificate))
			return false;
		if (schineseFirstPy == null) {
			if (other.schineseFirstPy != null)
				return false;
		} else if (!schineseFirstPy.equals(other.schineseFirstPy))
			return false;
		if (sdeptId == null) {
			if (other.sdeptId != null)
				return false;
		} else if (!sdeptId.equals(other.sdeptId))
			return false;
		if (sexamScore == null) {
			if (other.sexamScore != null)
				return false;
		} else if (!sexamScore.equals(other.sexamScore))
			return false;
		if (sfamilyAddress == null) {
			if (other.sfamilyAddress != null)
				return false;
		} else if (!sfamilyAddress.equals(other.sfamilyAddress))
			return false;
		if (shealthStatus == null) {
			if (other.shealthStatus != null)
				return false;
		} else if (!shealthStatus.equals(other.shealthStatus))
			return false;
		if (sid == null) {
			if (other.sid != null)
				return false;
		} else if (!sid.equals(other.sid))
			return false;
		if (sidcard == null) {
			if (other.sidcard != null)
				return false;
		} else if (!sidcard.equals(other.sidcard))
			return false;
		if (sjoinDate == null) {
			if (other.sjoinDate != null)
				return false;
		} else if (!sjoinDate.equals(other.sjoinDate))
			return false;
		if (sloginName == null) {
			if (other.sloginName != null)
				return false;
		} else if (!sloginName.equals(other.sloginName))
			return false;
		if (smainOrgId == null) {
			if (other.smainOrgId != null)
				return false;
		} else if (!smainOrgId.equals(other.smainOrgId))
			return false;
		if (smainOrgName == null) {
			if (other.smainOrgName != null)
				return false;
		} else if (!smainOrgName.equals(other.smainOrgName))
			return false;
		if (smd5str == null) {
			if (other.smd5str != null)
				return false;
		} else if (!smd5str.equals(other.smd5str))
			return false;
		if (smd5str2 == null) {
			if (other.smd5str2 != null)
				return false;
		} else if (!smd5str2.equals(other.smd5str2))
			return false;
		if (smd5str3 == null) {
			if (other.smd5str3 != null)
				return false;
		} else if (!smd5str3.equals(other.smd5str3))
			return false;
		if (smobilePhone == null) {
			if (other.smobilePhone != null)
				return false;
		} else if (!smobilePhone.equals(other.smobilePhone))
			return false;
		if (sname == null) {
			if (other.sname != null)
				return false;
		} else if (!sname.equals(other.sname))
			return false;
		if (sorgKindId == null) {
			if (other.sorgKindId != null)
				return false;
		} else if (!sorgKindId.equals(other.sorgKindId))
			return false;
		if (spassword == null) {
			if (other.spassword != null)
				return false;
		} else if (!spassword.equals(other.spassword))
			return false;
		if (sposition == null) {
			if (other.sposition != null)
				return false;
		} else if (!sposition.equals(other.sposition))
			return false;
		if (spositionName == null) {
			if (other.spositionName != null)
				return false;
		} else if (!spositionName.equals(other.spositionName))
			return false;
		if (ssex == null) {
			if (other.ssex != null)
				return false;
		} else if (!ssex.equals(other.ssex))
			return false;
		if (staffId == null) {
			if (other.staffId != null)
				return false;
		} else if (!staffId.equals(other.staffId))
			return false;
		if (strainDate == null) {
			if (other.strainDate != null)
				return false;
		} else if (!strainDate.equals(other.strainDate))
			return false;
		if (sworkType == null) {
			if (other.sworkType != null)
				return false;
		} else if (!sworkType.equals(other.sworkType))
			return false;
		return true;
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

	public SaOpperson(String sid) {
		this.sid = sid;
	}

	public SaOpperson(String sid, String sname, String sidcard, Integer sage, String sloginName, String spassword,
			Short loginCount, String smd5str, String smd5str2, String smd5str3, String smainOrgId, String smainOrgName,
			String sworkType, String shealthStatus, String ssex, Date sbirthday, Date strainDate, Float sexamScore,
			String sfamilyAddress, String sposition, String spositionName, String smobilePhone, String sdeptId,
			String schineseFirstPy, String sorgKindId, String fimage, String scertificate, Timestamp sjoinDate,
			String staffId, String deptName, String orgName, String deptId, String orgId, Integer ffaceState) {
		this.sid = sid;
		this.sname = sname;
		this.sidcard = sidcard;
		this.sage = sage;
		this.sloginName = sloginName;
		this.spassword = spassword;
		this.loginCount = loginCount;
		this.smd5str = smd5str;
		this.smd5str2 = smd5str2;
		this.smd5str3 = smd5str3;
		this.smainOrgId = smainOrgId;
		this.smainOrgName = smainOrgName;
		this.sworkType = sworkType;
		this.shealthStatus = shealthStatus;
		this.ssex = ssex;
		this.sbirthday = sbirthday;
		this.strainDate = strainDate;
		this.sexamScore = sexamScore;
		this.sfamilyAddress = sfamilyAddress;
		this.sposition = sposition;
		this.spositionName = spositionName;
		this.smobilePhone = smobilePhone;
		this.sdeptId = sdeptId;
		this.schineseFirstPy = schineseFirstPy;
		this.sorgKindId = sorgKindId;
		this.fimage = fimage;
		this.scertificate = scertificate;
		this.sjoinDate = sjoinDate;
		this.staffId = staffId;
		this.deptName = deptName;
		this.orgName = orgName;
		this.deptId = deptId;
		this.orgId = orgId;
		this.ffaceState = ffaceState;
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


	public String getSidcard() {
		return this.sidcard;
	}

	public void setSidcard(String sidcard) {
		this.sidcard = sidcard;
	}


	public Integer getSage() {
		return this.sage;
	}

	public void setSage(Integer sage) {
		this.sage = sage;
	}


	public String getSloginName() {
		return this.sloginName;
	}

	public void setSloginName(String sloginName) {
		this.sloginName = sloginName;
	}


	public String getSpassword() {
		return this.spassword;
	}

	public void setSpassword(String spassword) {
		this.spassword = spassword;
	}


	public Short getLoginCount() {
		return this.loginCount;
	}

	public void setLoginCount(Short loginCount) {
		this.loginCount = loginCount;
	}


	public String getSmd5str() {
		return this.smd5str;
	}

	public void setSmd5str(String smd5str) {
		this.smd5str = smd5str;
	}


	public String getSmd5str2() {
		return this.smd5str2;
	}

	public void setSmd5str2(String smd5str2) {
		this.smd5str2 = smd5str2;
	}


	public String getSmd5str3() {
		return this.smd5str3;
	}

	public void setSmd5str3(String smd5str3) {
		this.smd5str3 = smd5str3;
	}


	public String getSmainOrgId() {
		return this.smainOrgId;
	}

	public void setSmainOrgId(String smainOrgId) {
		this.smainOrgId = smainOrgId;
	}


	public String getSmainOrgName() {
		return this.smainOrgName;
	}

	public void setSmainOrgName(String smainOrgName) {
		this.smainOrgName = smainOrgName;
	}


	public String getSworkType() {
		return this.sworkType;
	}

	public void setSworkType(String sworkType) {
		this.sworkType = sworkType;
	}


	public String getShealthStatus() {
		return this.shealthStatus;
	}

	public void setShealthStatus(String shealthStatus) {
		this.shealthStatus = shealthStatus;
	}


	public String getSsex() {
		return this.ssex;
	}

	public void setSsex(String ssex) {
		this.ssex = ssex;
	}


	public Date getSbirthday() {
		return this.sbirthday;
	}

	public void setSbirthday(Date sbirthday) {
		this.sbirthday = sbirthday;
	}


	public Date getStrainDate() {
		return this.strainDate;
	}

	public void setStrainDate(Date strainDate) {
		this.strainDate = strainDate;
	}


	public Float getSexamScore() {
		return this.sexamScore;
	}

	public void setSexamScore(Float sexamScore) {
		this.sexamScore = sexamScore;
	}


	public String getSfamilyAddress() {
		return this.sfamilyAddress;
	}

	public void setSfamilyAddress(String sfamilyAddress) {
		this.sfamilyAddress = sfamilyAddress;
	}


	public String getSposition() {
		return this.sposition;
	}

	public void setSposition(String sposition) {
		this.sposition = sposition;
	}


	public String getSpositionName() {
		return this.spositionName;
	}

	public void setSpositionName(String spositionName) {
		this.spositionName = spositionName;
	}


	public String getSmobilePhone() {
		return this.smobilePhone;
	}

	public void setSmobilePhone(String smobilePhone) {
		this.smobilePhone = smobilePhone;
	}


	public String getSdeptId() {
		return this.sdeptId;
	}

	public void setSdeptId(String sdeptId) {
		this.sdeptId = sdeptId;
	}


	public String getSchineseFirstPy() {
		return this.schineseFirstPy;
	}

	public void setSchineseFirstPy(String schineseFirstPy) {
		this.schineseFirstPy = schineseFirstPy;
	}

	public String getSorgKindId() {
		return this.sorgKindId;
	}

	public void setSorgKindId(String sorgKindId) {
		this.sorgKindId = sorgKindId;
	}


	public String getFimage() {
		return this.fimage;
	}

	public void setFimage(String fimage) {
		this.fimage = fimage;
	}


	public String getScertificate() {
		return this.scertificate;
	}

	public void setScertificate(String scertificate) {
		this.scertificate = scertificate;
	}


	public Timestamp getSjoinDate() {
		return this.sjoinDate;
	}

	public void setSjoinDate(Timestamp sjoinDate) {
		this.sjoinDate = sjoinDate;
	}


	public String getStaffId() {
		return this.staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}


	public String getDeptName() {
		return this.deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}


	public String getOrgName() {
		return this.orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}


	public String getDeptId() {
		return this.deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}


	public String getOrgId() {
		return this.orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}


	public Integer getFfaceState() {
		return this.ffaceState;
	}

	public void setFfaceState(Integer ffaceState) {
		this.ffaceState = ffaceState;
	}

}