'use strict';

const login = new UserForm();
login.loginFormCallback = data => ApiConnector.login(data, response => response.success ? location.reload() : userForm.setLoginErrorMessage(response.data));
login.registerFormCallback = data => ApiConnector.register(data, response => response.success ? location.reload() : userForm.setRegisterErrorMessage(response.data));
