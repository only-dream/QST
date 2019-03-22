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
import Ernest.Entity.SaOporg;
import Ernest.Service.saOporgServiceI;
import Ernest.until.RecursiveHierarchy;

/**
 * @author Ernest
 *
 */
@Service
public class saOporgServiceimpl implements saOporgServiceI{

	@Autowired
	private saOporgDaoI saOporgDao;
	@Override
	public SaOporg findAdmin(String md5, String kind) {
		return saOporgDao.findAdmin(md5, kind);
	}
	
	@Override
	public void save(SaOporg saOporg) {
		
		saOporgDao.save(saOporg);
	}

	
	@Override
	public String updateSaOporgById(JSONObject json) {
		SaOporg saOporg  = new SaOporg();
		saOporg.setSid(json.getString("sid"));
		saOporg.setSname(json.getString("sname"));
		saOporg.setSfname(json.getString("sfname"));
		saOporg.setSmd5str(json.getString("smd5str"));
//		saOporg.setSorgKindId(json.getString("sorgKindId"));
//		saOporg.setSnodeKind(json.getString("snodeKind"));
//		saOporg.setSmd5str2(json.getString("smd5str2"));
//		saOporg.setSphone(json.getString("sphone"));
		saOporg.setSparentId(json.getString("sparentId"));
		saOporg.setFimage(json.getString("fimage"));
		saOporgDao.updateById(saOporg);
		JSONObject job = new JSONObject();
		job.put("success",true);
		job.put("message", "成功");
		//[{"sid":"1106","sname":"1","sfname":"2","smd5str":"3","sorgKindId":"4","snodeKind":"5","smd5str2":"6","sphone":"7","sparentId":"8","fimgae":"9"}]
		return job.toString();
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOporgServiceI#findRoleList(java.lang.String)
	 */
	@Override
	public String findRoleList(String md5) {
		JSONObject json = new JSONObject();
		List<SaOporg> list1 = saOporgDao.findByMd5(md5);
		List<Map<String,Object>> list2 = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list3 = new ArrayList<Map<String,Object>>();
		for(int i=0;i<list1.size();i++){
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("sId", list1.get(i).getSid());
			map.put("sMd5Str", list1.get(i).getSmd5str());
			map.put("sParendId", list1.get(i).getSparentId());
			map.put("sName", list1.get(i).getSfname());
			list2.add(map);
		}
		if(list1==null){
			json.put("list","[]");
			json.put("success", false);
		}else{
			Map<String,String> map1 = new HashMap<String, String>();
			map1.put("id", "sId");
			map1.put("label", "sName");
			map1.put("sParentID", "sParendId");
			map1.put("sMd5Str", "sMd5Str");
			Map<String, String> Parentmap= new HashMap<String, String>();
			Parentmap.put("sParentID", "id");
			list3 = RecursiveHierarchy.getChildren(list2, map1, Parentmap, 1, 2, null);
			json.put("list", list3);
			json.put("success", true);
		}
		return json.toString();
		
	}

	/* (non-Javadoc)
	 * @see Ernest.Service.saOporgServiceI#AllDepartment(java.lang.String)
	 */
	@Override
	public Map<String, Object> AllDepartment(String md5) {
		List<SaOporg> list = saOporgDao.getAllDepartment(md5, "dep");
		Map<String, Object> map = new HashMap<String, Object>();
		for(int i=0;i<list.size();i++){
			map.put(list.get(i).getSfname(),list.get(i).getSid() );
			map.put(list.get(i).getSid(),list.get(i).getSfname() );
		}
		return map;
	}

}
