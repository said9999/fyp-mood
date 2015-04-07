import org.eclipse.swt.graphics.Image;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

/*****************************
* This class handle the logic with user interaction
*******************************/
public class PressureController {
	//properties
	public String email;
	public String password;
	public HashMap<State, Integer> scores;
	public State myState;
	public HttpClient httpClient;

	public PressureController() {
		email = "";
		password = "";
		scores = new HashMap<State, Integer>();
		myState = State.Ready;
		httpClient = new HttpClient();
	}

	// run preset sh file to connect the logfile with serial port
	public void setup() throws IOException {
		Runtime.getRuntime().exec("rm outputdata");
		Runtime.getRuntime().exec("touch outputdata");
		Runtime.getRuntime().exec("sh init.sh");
	}
	
	// finish current dimension testing and move to next state
	public void next(PressureClientUI clientInterface) throws IOException {
		Image img;
		
		switch (myState) {
		case Ready:
			img = new Image(clientInterface.display, "Pleasure.jpg");
			clientInterface.lblImage.setImage(img);
			
			clientInterface.btnStart.setText("Next");
			clientInterface.btnStart.setEnabled(false);
			
			myState = State.Pleasure;
			test(clientInterface);
			
			break;
		case Pleasure:
			// TODO Add image
			img = new Image(clientInterface.display, "Arousal.jpg");
			clientInterface.lblImage.setImage(img);
			
			clientInterface.btnStart.setEnabled(false);
			
			myState = State.Arousal;
			test(clientInterface);
			
			break;
		case Arousal:
			// TODO Add image
			img = new Image(clientInterface.display, "Dominance.jpg");
			clientInterface.lblImage.setImage(img);
			
			clientInterface.btnStart.setEnabled(false);
			clientInterface.btnStart.setText("Upload");
			myState = State.Dominance;
			test(clientInterface);
			
			break;
		case Dominance:
			clientInterface.lblImage.setText("");
			clientInterface.lblScore.setText("");
			clientInterface.remindInfo.setText("Press start to begin the test");
			//submit result
			httpClient.submit(
				scores, 
				clientInterface.emailTextField.getText(), 
				clientInterface.passwordTextField.getText()
			);
			
			clientInterface.btnStart.setEnabled(true);
			
			setup();
			
			clientInterface.btnStart.setText("Start");
			myState = State.Ready;
			
			break;
		default:
			break;
		}
	}
	
	// start measuring users pressure with a background thread, with 3 seconds count down
	public void test(final PressureClientUI clientInterface) throws IOException{
		clientInterface.remindInfo.setText("Press the Sensor");
		
		setup();
		
		Runnable completeRunnable = new Runnable() {
			@Override
			public void run() {
				clientInterface.remindInfo.setText("Complete");
				clientInterface.btnStart.setEnabled(true);
				
				try {
					int score = calculateScore();
					clientInterface.controller.scores.put(clientInterface.controller.myState, score);
					clientInterface.lblScore.setText(String.valueOf(score));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		};
		
		// count down
		class MyRunnable implements Runnable {
			  private long down;
			  public MyRunnable(long l) {
			    this.down = l;
			  }

			  public void run() {
				  clientInterface.remindInfo.setText("Pls hold, count down " + (3 - down));
			  }
		}

		// read data from logfile and calculate the average score
		class PressureListenThread extends Thread {
			PressureClientUI clientInterface;
			Runnable completeRunnable;
			
			public void run(){
				File f = new File("outputdata");
				while(f.length() == 0);
				
				System.out.println("detect sensor");
				long timeNow = System.currentTimeMillis();
				long diff = 0;
				long coutdown_rate = 0;
				long score_update_rate = 0;
				MyRunnable countdownRunnable = new MyRunnable(coutdown_rate / 1000);
				this.clientInterface.display.asyncExec(countdownRunnable);
				
				while((diff=System.currentTimeMillis() - timeNow) < 3000) {
					//update count down message
					if (diff - coutdown_rate >= 1000) {
						coutdown_rate = diff;
						countdownRunnable = new MyRunnable(coutdown_rate / 1000);
						this.clientInterface.display.asyncExec(countdownRunnable);
					}
				}
				//this.clientInterface.remindInfo.setText("Complete");
				this.clientInterface.display.asyncExec(completeRunnable);
			}
			
			public PressureListenThread(PressureClientUI clientInterface, Runnable completeRunnable) {
				this.clientInterface = clientInterface;
				this.completeRunnable = completeRunnable;
			}
		}
		
		(new PressureListenThread(clientInterface, completeRunnable)).start();
	}

	// read the score from the logfile to calculate average score within 3 sec
	static public int calculateScore() throws IOException {
		int score = 0;
		int count = 0;
		
		BufferedReader br = new BufferedReader(new FileReader("outputdata"));
	    try {
	        StringBuilder sb = new StringBuilder();
	        String line = br.readLine();

	        while (line != null) {
	        	line = line.substring(0, line.length()-1);
	        	if (line.equals("")) {
	        		line = br.readLine();
	        		continue;
	        	}
	        	
	        	int tmp = Integer.parseInt(line);
	        	if (tmp > 0 && tmp < 950){
	        		score += tmp;
	        		System.out.println(line);
	            	count++;
	        	}
	            
	            line = br.readLine();
	        }
	    } finally {
	        br.close();
	    }
		
	    if (count == 0) return 1;
	    
		return 10 - score/count/100 ;
	}
}
