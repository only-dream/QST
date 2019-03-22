/**
 * 
 */
package Ernest.Service;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.saOprole;

/**
 * @author Ernest
 *
 */
public interface saOproleServiceI {
	JSONObject listSaOprole(String md5);
	
	JSONObject selectSaOproleList(String md5);
	
	saOprole selectSaOprole(String id);
	
	void addSaOprole(saOprole saOprole);
	
	void updateById(saOprole saOprole);
	
	List<Map<String, Object>> selectJobName(String id);
}
