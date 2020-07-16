'use strict';

const logout = new LogoutButton;
logout.action = () => ApiConnector.logout(response => {if (response.success) {location.reload()}});

ApiConnector.current(response => {
  if (response) {
    ProfileWidget.showProfile(response.data);
  }
});

const rates = new RatesBoard;
function getRates() {
  // console.log('Запрос данных...');
  ApiConnector.getStocks(response => {
    if (response.success) {
      rates.clearTable();
      rates.fillTable(response.data);
    }
  });
}

getRates();
setInterval(getRates, 60000);

