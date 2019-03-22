/**
 * 
 */
package Ernest.Service.Imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import Ernest.Dao.saOporgDaoI;
import Ernest.Dao.saOppersonDaoI;
import Ernest.Entity.SaOporg;
import Ernest.Entity.SaOpperson;
import Ernest.Service.saOporgServiceI;
import Ernest.Service.saOppersonServiceI;
import Ernest.Service.saOproleServiceI;

/**
 * @author Ernest
 *
 */
@Service
public class saOppersonServiceimpl implements saOppersonServiceI {

	@Autowired
	private saOppersonDaoI saOppersonDao;
	@Autowired
	private saOporgDaoI saOporgDao;
	@Autowired
	private saOporgServiceI saOporgService;
	@Autowired
	private saOproleServiceI saOproleService;
	
	@Override
	public JSONObject LoginBy(String name, String password) {
		JSONObject job = new JSONObject();
		JSONObject job1 = new JSONObject();
		SaOpperson sa = saOppersonDao.Login(name, password);
		boolean falge = true;
		String message = "";
		if(sa==null){
			falge=false;
			message="账号不存在";
		}
		if(falge&&"orgPer".equals(sa.getSaOporg().getSnodeKind())){
			job1.put("sName", sa.getSname());
			job1.put("sLoginName", sa.getSloginName());
			job1.put("sMd5Str", sa.getSmd5str());
			String sID = sa.getSid();
			SaOporg so = saOporgDao.findAdmin(sa.getSmd5str(), "orgPer");
			String sID2 = so.getSid();
			if(!sID.equals(sID2)){
				sID=sID2;
			}
			job1.put("sID", sID);
			job1.put("sMainOrgID", sa.getSmainOrgId());
			job1.put("sDeptID", sa.getDeptId());
			job1.put("sChineseFirstPY", sa.getSchineseFirstPy());
			job1.put("sOrgKindID", sa.getSorgKindId());
			job1.put("fImage", sa.getFimage());
			job1.put("sJoinDate", sa.getSjoinDate());
			job1.put("sParentID", sa.getSaOporg().getSparentId());
			job1.put("sNodeKind", sa.getSaOporg().getSnodeKind());
			String readonly = sa.getOrgId();
			if(readonly==null||"".equals(readonly)||"null".equals(readonly)){
				readonly = "";
			}
			job1.put("readonly", readonly);
		}else{
			if(falge==false){
			}else{
				falge=false;
				message="您没有登录权限";
			}
			
		}
		if(falge){
			job.put("message", "登录成功");
			job.put("success", true);
		}else{
			job.put("message", message);
			job.put("success", falge);
		}
		job.put("data", job1);
		
		return job;
	}

	
	@Override
	public void save(SaOpperson saOpperson) {
		
		saOppersonDao.save(saOpperson);
	}


	/* (non-Javadoc)
	 * @see Ernest.Service.saOppersonServiceI#findPerson(java.lang.String, java.lang.String)
	 */
	@Override
	public JSONObject findPerson(String id, String md5Str) {
		JSONObject json = new JSONObject();
		if(id==null){
			json.put("Data", "[]");
			json.put("success", false);
			return json;
		}
		if(md5Str==null){
			json.put("Data", "[]");
			json.put("success", false);
			return json;
		}
		Map<String ,Object> orgMap = saOporgService.AllDepartment(md5Str);
		String sMainOrgName=(String) orgMap.get(id);
		List<Map<String, Object>> list =new ArrayList<Map<String,Object>>();
		List<SaOpperson> list1 = saOppersonDao.findPersonList(id);
		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		for(int i=0;i<list1.size();i++){
			List<Map<String, Object>> list3 =new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			SaOpperson saOpperson = new SaOpperson();
			saOpperson = list1.get(i);
			map.put("sID", saOpperson.getSid());//人员ID
			map.put("sName", saOpperson.getSname());//真实姓名
			map.put("sIDCard",saOpperson.getSidcard());//人员身份证
			map.put("sLoginName", saOpperson.getSloginName());//登录名
			map.put("sPassword", saOpperson.getSpassword());//密码
			map.put("sWorkType", saOpperson.getSworkType());//工种
			map.put("sHealthStatus",saOpperson.getShealthStatus());//体检状况
			map.put("sSex", saOpperson.getSsex());//性别
			map.put("sTrainDate", saOpperson.getStrainDate());//培训日期
			map.put("sExamScore", saOpperson.getSexamScore());//考试分数
			map.put("sMobilePhone", saOpperson.getSmobilePhone());//手机号码
			map.put("sDeptID", saOpperson.getSdeptId());//部门ID
			map.put("sChineseFirstPY", saOpperson.getSchineseFirstPy());//姓名首字母
			map.put("sOrgKindID", saOpperson.getSorgKindId());//组织 性质，为了过滤人员用
			map.put("fImage", saOpperson.getFimage());//头像
			map.put("sMainOrgID",  id);//组
			map.put("sMainOrgName",  sMainOrgName);//组织ID
			map.put("orgNameID",  id);//父亲ID
			map.put("sNodeKind", saOpperson.getSaOporg().getSnodeKind());
			map.put("AdminPer", saOpperson.getSaOporg().getSnodeKind().equals("per")?"否":"是");
			list3=saOproleService.selectJobName(saOpperson.getSid());
			map.put("roleIds", list3);
			list.add(map);
		}
		if(list.isEmpty()){
			json.put("Data","[]");
			json.put("success", false);
		}else{
			json.put("Data",list);
			json.put("success", true);
			
		}
		return json;
	}


	/* (non-Javadoc)
	 * @see Ernest.Service.saOppersonServiceI#likeFind(java.lang.String, java.lang.String)
	 */
	@Override
	public JSONObject likeFind(String id,String md5Str, String name) {
		JSONObject json = new JSONObject();
		
		if(md5Str==null){
			json.put("Data", "[]");
			json.put("success", false);
			return json;
		}
		Map<String ,Object> orgMap = saOporgService.AllDepartment(md5Str);
		String sMainOrgName=(String) orgMap.get(id);
		List<Map<String, Object>> list =new ArrayList<Map<String,Object>>();
		List<SaOpperson> list1 = saOppersonDao.likeFindPersonList(md5Str,id,name);
		List<Map<String, Object>> list2 = new ArrayList<Map<String,Object>>();
		for(int i=0;i<list1.size();i++){
			List<Map<String, Object>> list3 =new ArrayList<Map<String,Object>>();
			Map<String, Object> map = new HashMap<String, Object>();
			SaOpperson saOpperson = new SaOpperson();
			saOpperson = list1.get(i);
			map.put("sID", saOpperson.getSid());//人员ID
			map.put("sName", saOpperson.getSname());//真实姓名
			map.put("sIDCard",saOpperson.getSidcard());//人员身份证
			map.put("sLoginName", saOpperson.getSloginName());//登录名
			map.put("sPassword", saOpperson.getSpassword());//密码
			map.put("sWorkType", saOpperson.getSworkType());//工种
			map.put("sHealthStatus",saOpperson.getShealthStatus());//体检状况
			map.put("sSex", saOpperson.getSsex());//性别
			map.put("sTrainDate", saOpperson.getStrainDate());//培训日期
			map.put("sExamScore", saOpperson.getSexamScore());//考试分数
			map.put("sMobilePhone", saOpperson.getSmobilePhone());//手机号码
			map.put("sDeptID", saOpperson.getSdeptId());//部门ID
			map.put("sChineseFirstPY", saOpperson.getSchineseFirstPy());//姓名首字母
			map.put("sOrgKindID", saOpperson.getSorgKindId());//组织 性质，为了过滤人员用
			map.put("fImage", saOpperson.getFimage());//头像
			map.put("sMainOrgID",  id);//组
			map.put("sMainOrgName",  sMainOrgName);//组织ID
			map.put("orgNameID",  id);//父亲ID
			map.put("sNodeKind", saOpperson.getSaOporg().getSnodeKind());
			map.put("AdminPer", saOpperson.getSaOporg().getSnodeKind().equals("per")?"否":"是");
			list3=saOproleService.selectJobName(saOpperson.getSid());
			map.put("roleIds", list3);
			list.add(map);
		}
		if(list.isEmpty()){
			json.put("Data","[]");
			json.put("success", false);
		}else{
			json.put("Data",list);
			json.put("success", true);
			
		}
		return json;
	}

}
