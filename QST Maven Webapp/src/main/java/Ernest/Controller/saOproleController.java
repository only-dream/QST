/**
 * 
 */
package Ernest.Controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import Ernest.Entity.saOprole;
import Ernest.Service.saOproleServiceI;
import Ernest.until.TimeUntil;

/**测试
 * @author Ernest
 *
 */
@RestController
@RequestMapping(value="/saOproleController")
//@RequestMapping(value="/saOproleController", produces = {"application/json;charset=UTF-8"})
public class saOproleController {
	private static final Logger logger = Logger.getLogger(saOproleController.class);
	@Autowired
    private saOproleServiceI saOproleservice;
	@GetMapping("/selectRole")
	public JSONObject getSaOproleBymd5(String md5){
		
		JSONObject jsonResult = saOproleservice.listSaOprole(md5);
		return jsonResult;
	}
	
	@PostMapping("/addSaOprole")
//	@ResponseBody
	public String addSaOprole(String sID,String sName,String sCreateTime,String sMd5Str){
		saOprole so = new saOprole();
		so.setSid(sID);
		so.setSmd5str(sMd5Str);
		so.setSname(sName);
		so.setScreateTime(TimeUntil.StringToTimestamp(sCreateTime));
		saOproleservice.addSaOprole(so);
		JSONObject job = new JSONObject();
		job.put("success", true);
		job.put("message","保存成功");
		return job.toString();
	}
	
	@GetMapping("/SelectOproleName")
	public JSONObject selectOporgName(String sMd5Str){
		JSONObject jsonResult = saOproleservice.selectSaOproleList(sMd5Str);
		return jsonResult;
	}
	
	
	
}
