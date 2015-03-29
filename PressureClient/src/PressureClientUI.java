import java.io.IOException;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Button;
import org.eclipse.wb.swt.SWTResourceManager;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;


public class PressureClientUI {

	protected Shell shell;
	public Text emailTextField;
	public Text passwordTextField;
	public Button btnStart;
	public Label lblImage;
	public Label lblScore;
	public Label remindInfo;
	public Display display;
	
	public PressureController controller;
	
	public PressureClientUI() {
		controller = new PressureController();
	}

	/**
	 * Launch the application.
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			PressureClientUI window = new PressureClientUI();
			window.controller.setup();
			
			window.open();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Open the window.
	 */
	public void open() {
		display = Display.getDefault();
		createContents();
		shell.open();
		shell.layout();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch()) {
				display.sleep();
			}
		}
	}

	/**
	 * Create contents of the window.
	 */
	protected void createContents() {
		shell = new Shell();
		shell.setSize(450, 384);
		shell.setText("SWT Application");
		
		emailTextField = new Text(shell, SWT.BORDER);
		emailTextField.setBounds(75, 22, 180, 19);
		
		Label lblEmail = new Label(shell, SWT.NONE);
		lblEmail.setBounds(10, 25, 38, 14);
		lblEmail.setText("Email");
		
		passwordTextField = new Text(shell, SWT.BORDER);
		passwordTextField.setBounds(75, 47, 180, 19);
		
		Label lblPassword = new Label(shell, SWT.NONE);
		lblPassword.setBounds(10, 50, 59, 14);
		lblPassword.setText("Password");
		
		Label label_1 = new Label(shell, SWT.SEPARATOR | SWT.HORIZONTAL);
		label_1.setBounds(0, 72, 450, 13);
		
		btnStart = new Button(shell, SWT.NONE);
		final PressureClientUI that = this;
		btnStart.addSelectionListener(new SelectionAdapter() {
			@Override
			public void widgetSelected(SelectionEvent arg0) {
				try {
					that.controller.next(that);
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		});
		
		btnStart.setBounds(170, 324, 94, 28);
		btnStart.setText("Start");
		
		lblImage = new Label(shell, SWT.NONE);
		lblImage.setBounds(29, 121, 156, 159);
		
		lblScore = new Label(shell, SWT.NONE);
		lblScore.setFont(SWTResourceManager.getFont("Lucida Grande", 20, SWT.NORMAL));
		lblScore.setAlignment(SWT.CENTER);
		lblScore.setBounds(245, 174, 156, 28);
		
		Label label = new Label(shell, SWT.SEPARATOR | SWT.VERTICAL);
		label.setBounds(208, 81, 17, 199);
		
		remindInfo = new Label(shell, SWT.NONE);
		remindInfo.setAlignment(SWT.CENTER);
		remindInfo.setBounds(103, 304, 223, 19);
		remindInfo.setText("Press Start Button to begin the test");
	}
}
