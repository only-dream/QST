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

import Ernest.Dao.saOproleDaoI;
import Ernest.Entity.saOprole;
import Ernest.Service.saOproleServiceI;
import Ernest.until.TimeUntil;

/**
 * @author Ernest
 *
 */
@Service
public class saOproleServiceimp implements saOproleServiceI {
	 @Autowired
	private saOproleDaoI saOproleDao;
	/* (non-Javadoc)
	 * @see Ernest.Service.saOproleServiceI#listSaOprole(java.lang.String)
	 */
	@Override
	public JSONObject listSaOprole(String md5) {
		JSONObject json  = new JSONObject();
		List<saOprole> list1 =  saOproleDao.findAllBySaOproleSmd5str(md5);
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		for(int i=0;i<list1.size();i++){
			saOprole saoprole = new saOprole();
			saoprole = list1.get(i);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sID",saoprole.getSid());
			map.put("sName",saoprole.getSname());
			map.put("sMd5Str",saoprole.getSmd5str());
			String sTime = TimeUntil.TimestampToString(saoprole.getScreateTime()).replace("/", "-");
			map.put("sCreateTime",sTime);
			list.add(map);
		}
		if(list.isEmpty()){
			json.put("date", "[]");
			json.put("success", false);
			json.put("message", "查无数据");
		}else{
			json.put("date", list);
			json.put("success", true);
			json.put("message", "查找成功");
			
		}
		return json;
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOproleServiceI#selectSaOprole(java.lang.String)
	 */
	@Override
	public saOprole selectSaOprole(String id) {
		return saOproleDao.findBySaOproleId(id);
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOproleServiceI#addSaOprole(Ernest.Entity.saOprole)
	 */
	@Override
	public void addSaOprole(saOprole saOprole) {
		saOproleDao.save(saOprole);
	}

	
	@Override
	public void updateById(saOprole saOprole) {
		saOproleDao.update(saOprole);
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOproleServiceI#selectJobName(java.lang.String)
	 */
	@Override
	public List<Map<String, Object>> selectJobName(String id) {
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		List<saOprole> list2= saOproleDao.findJob(id);
		if(list2.size()==0){
			list2 = saOproleDao.findgroup(id);
		}
		for(int i=0;i<list2.size();i++){
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sID", list2.get(i).getSid());
			map.put("sName", list2.get(i).getSname());
			list.add(map);
		}
		return list;
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOproleServiceI#selectSaOproleList(java.lang.String)
	 */
	@Override
	public JSONObject selectSaOproleList(String md5) {
		JSONObject json  = new JSONObject();
		List<saOprole> list1 =  saOproleDao.findAllBySaOproleSmd5str(md5);
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		for(int i=0;i<list1.size();i++){
			saOprole saoprole = new saOprole();
			saoprole = list1.get(i);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sID",saoprole.getSid());
			map.put("sName",saoprole.getSname());
			list.add(map);
		}
		if(list.isEmpty()){
			json.put("select", "[]");
			json.put("success", false);
			json.put("message", "查无数据");
		}else{
			json.put("select", list);
			json.put("success", true);
			json.put("message", "查找成功");
			
		}
		return json;
	}

	
	
}
