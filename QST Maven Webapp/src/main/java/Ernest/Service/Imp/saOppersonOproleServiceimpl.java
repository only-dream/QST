/**
 * 
 */
package Ernest.Service.Imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;

import Ernest.Dao.saOppersonOproleDaoI;
import Ernest.Entity.SaOppersonOprole;
import Ernest.Service.saOppersonOproleServiceI;

/**
 * @author Ernest
 *
 */
@Service
public class saOppersonOproleServiceimpl implements saOppersonOproleServiceI {
	
	@Autowired
	private saOppersonOproleDaoI saOODao;
	
	@Override
	public String addSaOpersonOprole(JSONObject json) {
		SaOppersonOprole saOppersonOprole = new SaOppersonOprole();
		saOppersonOprole.setRoleId(json.getString("role"));
		saOppersonOprole.setSid(json.getString("sid"));
		saOppersonOprole.setSmd5str(json.getString("smd5str"));
		saOppersonOprole.setUserId(json.getString("userId"));
		saOODao.save(saOppersonOprole);
		JSONObject job = new JSONObject();
		job.put("success", true);
		job.put("message", "成功");
		return job.toString();
	}

	
	@Override
	public String updateSaOpersonOprole(JSONObject json) {
		SaOppersonOprole saOppersonOprole = new SaOppersonOprole();
		saOppersonOprole.setRoleId(json.getString("role"));
		saOppersonOprole.setSid(json.getString("sid"));
		saOppersonOprole.setSmd5str(json.getString("smd5str"));
		saOppersonOprole.setUserId(json.getString("userId"));
		saOODao.updateById(saOppersonOprole);
		JSONObject job = new JSONObject();
		job.put("success", true);
		job.put("message", "成功");
		return job.toString();
	}


	/* (non-Javadoc)
	 * @see Ernest.Service.saOppersonOproleServiceI#DeleteSaOpersonOprole(java.lang.String)
	 */
	@Override
	public String DeleteSaOpersonOprole(String id) {
		saOODao.deletById(id);
		JSONObject job = new JSONObject();
		job.put("success", true);
		job.put("message", "成功");
		return job.toString();
	}


	/* (non-Javadoc)
	 * @see Ernest.Service.saOppersonOproleServiceI#findSaOpersonOprole(java.lang.String)
	 */
	@Override
	public String findSaOpersonOprole(String id) {
		SaOppersonOprole saOppersonOprole = saOODao.findById(id);
		JSONObject job = new JSONObject();
		if(saOppersonOprole==null){
			return "{}";
		}else{
			
			job.put("sid",saOppersonOprole.getSid());
			job.put("role",saOppersonOprole.getRoleId());
			job.put("smd5str",saOppersonOprole.getSmd5str());
			job.put("userId",saOppersonOprole.getUserId());
			return job.toJSONString();
		}
		
	}

	
	
}
