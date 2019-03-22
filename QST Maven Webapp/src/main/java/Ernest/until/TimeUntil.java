/**
 * 
 */
package Ernest.until;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 时间类型和string转换工具类
 * @author Ernest
 *
 */
public class TimeUntil {

	/**
	 * string转date
	 * @param TimeStr 时间字符串[yyyy/MM/dd HH:mm:ss]或[yyyy-MM-dd HH:mm:ss]
	 * @return Date
	 */
	public static Date StringToDate(String TimeStr){
		
		Date date = new Date();   
		String Time = TimeStr.replaceAll("-", "/");
        //注意format的格式要与日期String的格式相匹配   
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");   
        try {   
           date = sdf.parse(TimeStr);   
            System.out.println(date.toString());
            return date;
        } catch (Exception e) {   
            e.printStackTrace();   
        }
		return date;  
		
	}
	
	/**
	 * date转string
	 * @param date 
	 * @return String[yyyy/MM/dd HH:mm:ss]
	 */
	public static String DateToString(Date date){
		String dateStr = "";   
	    //format的格式可以任意   
	    DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");   
        try {   
            dateStr = sdf.format(date);   
            System.out.println(dateStr); 
            return dateStr;
        } catch (Exception e) {   
            e.printStackTrace();   
        }  
		return dateStr;
	}
	
	/**
	 * String转Timestamp
	 * @param TimeStr 时间字符串[yyyy/MM/dd HH:mm:ss]或[yyyy-MM-dd HH:mm:ss]
	 * @return Timestamp
	 */
	public static Timestamp StringToTimestamp(String TimeStr){
		String Time = TimeStr.replaceAll("/", "-");
		Timestamp ts = new Timestamp(System.currentTimeMillis());   
        try {   
            ts = Timestamp.valueOf(Time);   
            System.out.println(ts);   
            return ts;  
        } catch (Exception e) {   
            e.printStackTrace();   
        }
		return ts;  
	}
	
	/**
	 * Timestamp转String
	 * @param timestamp Timestamp
	 * @return String[yyyy/MM/dd HH:mm:ss]
	 */
	public static String TimestampToString(Timestamp timestamp){
		String TimeStr="";
        DateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");   
        try {   
            //方法一   
        	TimeStr = sdf.format(timestamp);   
            System.out.println(TimeStr);  
            
            //方法二   
//	            tsStr = ts.toString();   
//	            System.out.println(tsStr);   
            return TimeStr;
        } catch (Exception e) {   
            e.printStackTrace();   
        }  
		return TimeStr;
	}
}
