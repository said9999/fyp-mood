import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;


public class HttpClient {
	private static String host = "http://localhost:3000/data_update/sensor/";
	
	public void submit(final HashMap<State, Integer> scores, final String email, final String password ) throws UnsupportedEncodingException {
		String urlParams = compositeUrlString(new HashMap<String, String>(){{
						     					put("total_score",compositeScore(scores));
						     					put("email", email);
						     					put("password", password);
						   					  }});
		
		
		excutePost(host, urlParams);
		
		System.out.println("submit successfully");
	}
	
	public static String compositeScore(HashMap<State, Integer> scores) {
		int P = scores.get(State.Pleasure);
		int A = scores.get(State.Arousal);
		int D = scores.get(State.Dominance);
		
		int score = P * 100 + A * 10 + D;
		
		return String.valueOf(score);
	}
	
	public static String compositeUrlString(HashMap<String, String>maps) throws UnsupportedEncodingException {
		String base = "score=" + maps.get("score");
		maps.remove("score");
		for (String key : maps.keySet()) {
			base += ("&" + key + "=" + URLEncoder.encode(maps.get(key), "UTF-8"));
		}
		
		System.out.println(base);
		
		return base;
	}
	
	public static String excutePost(String targetURL, String urlParameters)
	  {
	    URL url;
	    HttpURLConnection connection = null;  
	    try {
	      //Create connection
	      url = new URL(targetURL);
	      connection = (HttpURLConnection)url.openConnection();
	      connection.setRequestMethod("POST");
	      connection.setRequestProperty("Content-Type", 
	           "application/x-www-form-urlencoded");
				
	      connection.setRequestProperty("Content-Length", "" + 
	               Integer.toString(urlParameters.getBytes().length));
	      connection.setRequestProperty("Content-Language", "en-US");  
				
	      connection.setUseCaches (false);
	      connection.setDoInput(true);
	      connection.setDoOutput(true);

	      //Send request
	      DataOutputStream wr = new DataOutputStream (
	                  connection.getOutputStream ());
	      wr.writeBytes (urlParameters);
	      wr.flush ();
	      wr.close ();

	      //Get Response	
	      InputStream is = connection.getInputStream();
	      BufferedReader rd = new BufferedReader(new InputStreamReader(is));
	      String line;
	      StringBuffer response = new StringBuffer(); 
	      while((line = rd.readLine()) != null) {
	        response.append(line);
	        response.append('\r');
	      }
	      rd.close();
	      
	      return response.toString();

	    } catch (Exception e) {

	      e.printStackTrace();
	      return null;

	    } finally {

	      if(connection != null) {
	        connection.disconnect(); 
	      }
	    }
	  }
}
