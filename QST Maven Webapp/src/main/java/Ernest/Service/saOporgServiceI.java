/**
 * 
 */
package Ernest.Service;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.SaOporg;

/**
 * @author Ernest
 *
 */
public interface saOporgServiceI {
	
	SaOporg findAdmin(String md5,String kind);
	
	void save(SaOporg saOporg);
	
	String updateSaOporgById(JSONObject json);
	
	String findRoleList(String md5);
	
	Map<String ,Object> AllDepartment(String md5);
}
