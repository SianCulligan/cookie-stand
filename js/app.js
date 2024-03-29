'use strict';

var hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

var tableEl = document.getElementById('storeList');
var allStoresArr = [];

var formEl = document.getElementById('addAStoreForm');

function Store(storeName, minCust, maxCust, averageCookiesPerCust){
  this.storeName = storeName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookiesPerCust = averageCookiesPerCust;
  this.totalCookiesSoldPerDay = 0;
  this.numbOfCustPerHourArr = [];
  this.numbOfCookiesSoldEachHourArr = [];
  Store.prototype.calcNumbOfCustPerHour = function () {
    for (var i = 0; i < hours.length; i++) {
      var cust = parseInt(Math.floor(Math.random() * (this.maxCust - this.minCust + 1)) + this.minCust);
      this.numbOfCustPerHourArr.push(cust);
    }
  };
  Store.prototype.calcNumbOfCookiesSoldEachHour = function () {
    this.calcNumbOfCustPerHour();
    console.log(this.numbOfCustPerHourArr);
    var cookiesPerHour = 0;
    for (var i = 0; i < this.numbOfCustPerHourArr.length; i++) {
      cookiesPerHour = parseInt(Math.ceil(this.numbOfCustPerHourArr[i] * this.averageCookiesPerCust));
      console.log(cookiesPerHour);
      this.numbOfCookiesSoldEachHourArr.push(cookiesPerHour);
      this.totalCookiesSoldPerDay += cookiesPerHour;
    }
  };

  this.calcNumbOfCookiesSoldEachHour();

  allStoresArr.push(this);
}

Store.prototype.render = function(){
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = this.storeName;
  trEl.appendChild(tdEl);

  for(var i = 0; i <this.numbOfCookiesSoldEachHourArr.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = parseInt(this.numbOfCookiesSoldEachHourArr[i]);
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookiesSoldPerDay;
  trEl.appendChild(tdEl);
};

new Store('1st & Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 7, 65, 6.3);
new Store('Capitol Hill', 23, 65, 6.3);
new Store('Alki', 23, 65, 6.3);

function renderHeader(){
  var trEl = document.createElement('tr');

  var tdEl = document.createElement('td');
  tdEl.textContent = 'Location';
  trEl.appendChild(tdEl);

  for(var i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = hours[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = 'Daily Location Total';
  trEl.appendChild(tdEl);
  tableEl.appendChild(trEl);
}


function renderFooter(){
  var tfootEl = document.createElement ('tfoot');
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total by hour:';
  trEl.appendChild(tdEl);

  var grandTotal = 0;

  for(var h = 0; h < hours.length; h++){
    var total = 0;
    for(var s = 0; s < allStoresArr.length; s++){
      total += allStoresArr[s].numbOfCookiesSoldEachHourArr[h];
    }
    grandTotal += total;
    tdEl = document.createElement('td');
    tdEl.textContent = total;
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  trEl.appendChild(tdEl);
  tfootEl.appendChild(trEl);
  tableEl.appendChild(tfootEl);
}

function addAStore (event){
  event.preventDefault();
  var location = event.target.locationName.value;
  var min = parseInt(event.target.minimum.value);
  var max = parseInt(event.target.maximum.value);
  var avg = parseInt(event.target.averageCookies.value);
  console.log('AVERAGES', avg);

  new Store(location, min, max, avg);
  tableEl.innerHTML='';
  renderHeader();
  for(var i = 0; i < allStoresArr.length; i++){
    allStoresArr[i].render();
  }
  renderFooter();
}

renderHeader();
for(var i = 0; i < allStoresArr.length; i++){
  allStoresArr[i].render();
}
renderFooter();
formEl.addEventListener('submit', addAStore);