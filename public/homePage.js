'use strict';

const logout = new LogoutButton();
logout.action = () => ApiConnector.logout(response => {
  if (response.success) {location.reload()
}});

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const rates = new RatesBoard();
function getRates() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      rates.clearTable();
      rates.fillTable(response.data);
    }
  });
}

getRates();
setInterval(getRates, 60000);

const manager = new MoneyManager();
manager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      manager.setMessage(false, 'Деньги успешно зачислены.');
    } else {
      manager.setMessage(true, response.data);
    }
  });
}

manager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      manager.setMessage(false, 'Деньги успешно конвертированы.');
    } else {
      manager.setMessage(true, response.data);
    }
  })
}

manager.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      manager.setMessage(false, 'Деньги успешно переведены.');
    } else {
      manager.setMessage(true, response.data);
    }
  })
}

function updateFavorites(response) {
  favorites.clearTable();
  favorites.fillTable(response.data);
  manager.updateUsersList(response.data);
}

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    updateFavorites(response);
  }
});

favorites.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      updateFavorites(response);
      favorites.setMessage(false, 'Пользователь успешно добавлен в "Избранные".');
    } else {
      favorites.setMessage(true, response.data);
    }
  });
}

favorites.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success) {
      updateFavorites(response);
      favorites.setMessage(false, 'Пользователь успешно удалён из "Избранных".');
    } else {
      favorites.setMessage(true, response.data);
    }
  });
}
