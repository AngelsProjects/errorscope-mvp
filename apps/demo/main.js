import { init, captureException, captureMessage } from '@errorscope/sdk';

// Initialize SDK
init({
  apiKey: 'demo-api-key',
  endpoint: 'http://localhost:3001/api',
  appName: 'demo-app',
  environment: 'development',
  enableAutoCapture: true,
});

window.throwError = () => {
  try {
    throw new Error('This is a test error from the demo app!');
  } catch (error) {
    captureException(error, {
      action: 'button_click',
      userId: 'demo-user-123',
    });
    alert('Error sent! Check your dashboard.');
  }
};

window.throwAsync = async () => {
  try {
    await Promise.reject(new Error('Async operation failed!'));
  } catch (error) {
    captureException(error, { async: true });
    alert('Async error sent!');
  }
};

window.sendWarning = () => {
  captureMessage('This is a warning message', 'warning', {
    feature: 'demo',
  });
  alert('Warning sent!');
};

window.sendInfo = () => {
  captureMessage('User completed action', 'info', {
    action: 'demo_info',
  });
  alert('Info message sent!');
};

window.throwUndefined = () => {
  const obj = null;
  obj.property; // Will throw error
};
