/**
 * 
 */
package Ernest.Controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.SaOpperson;
import Ernest.Service.saOporgServiceI;
import Ernest.Service.saOppersonServiceI;
import Ernest.until.TimeUntil;

/**人员相关功能
 * @author Ernest
 *
 */
@RestController
@RequestMapping(value="/saOppersonController")
public class saOppersonController {
	@Autowired
	private saOppersonServiceI saOppersonService;
	@Autowired
	private saOporgServiceI saOporgService;
	private static final Logger logger = Logger.getLogger(saOproleController.class);
	
	/**
	 * 登录功能
	 * @param sLoginName
	 * @param sPassword
	 * @return
	 */
	@GetMapping("/Login")
	@ResponseBody
	public String Login(String sLoginName,String sPassword){
		
		JSONObject job = saOppersonService.LoginBy(sLoginName, sPassword);
		
		return job.toString();
	} 
	
	/**
	 * 
	 * @param json
	 * @return
	 */
	@PostMapping("/save")
	public String save(String str){
		JSONArray  jsonA = JSONArray.parseArray(str);
		JSONObject json = jsonA.getJSONObject(0);
		SaOpperson so = new SaOpperson();
		so.setSid(json.getString("sid"));
		so.setSname(json.getString("sname"));
		so.setSidcard(json.getString("sidcard"));
		so.setSloginName(json.getString("sloginName"));
		so.setSpassword(json.getString("spassword"));
		so.setSmd5str(json.getString("smd5str"));
		so.setSmainOrgId(json.getString("smainOrgId"));
		so.setSworkType(json.getString("sworkType"));
		so.setSdeptId(json.getString("sdeptId"));
		so.setSchineseFirstPy(json.getString("schineseFirstPy"));
		so.setSorgKindId(json.getString("sorgKindId"));
		so.setFimage(json.getString("fimage"));
		so.setSjoinDate(TimeUntil.StringToTimestamp(json.getString("sjoinDate")));
		so.setOrgId(json.getString("orgId"));
		saOppersonService.save(so);
		return "成功";
	}
	
	@GetMapping("/SelectOpperson")
	@ResponseBody
	public JSONObject SelectOpperson(String id ,String md5Str){
		JSONObject json = saOppersonService.findPerson(id, md5Str);
		return json;
	}
	
	@GetMapping("/seekOpperson")
	public JSONObject seekOpperson(String id ,String md5Str,String Name){
		JSONObject jsonResult = saOppersonService.likeFind(id, md5Str, Name);
		return jsonResult;
		
	}
	
}
