console.log('powerschool-suite');

function getRows() {
  return document.getElementsByTagName('tr');
}

function readScores() {
  s1 = [];
  s2 = [];
  rows = getRows();

  for (var i=3; i<rows.length-2; i++) {
    items = rows[i].getElementsByTagName('td');
    s1.push(items[14].innerText);
    s2.push(items[17].innerText);
  }

  return [s1, s2];
}

function calcAvg(arr) {
  sum = 0;
  div = 0;

  for (var i=0; i<arr.length; i++) {
    wt = 1;

    // exception for HSO
    if ( i == 8 ) wt = 0.5;

    if ( !isNaN(arr[i]) ) {
      sum += wt*arr[i]
      div += wt;
    }
  }

  if ( div == 0 ) return 0;
  else            return sum/div;
}

function textformat(val) {
  return +(Math.round(val+'e+3') + 'e-3');
}

function displayAvg(s1, s2) {
  rows = getRows();
  row = rows[rows.length-2];

  console.log(row);
  firstElem = row.getElementsByTagName('th')[0];
  firstElem.setAttribute('colspan', '12');

  var d1 = document.createElement('th');
  d1.innerText = textformat(s1);
  d1.setAttribute('colspan', '3');
  firstElem.after(d1);

  var d2 = document.createElement('th');
  d2.innerText = textformat(s2);
  d2.setAttribute('colspan', '3');
  d1.after(d2);
}

function update() {
  scores = readScores();
  s1 = calcAvg(scores[0]);
  s2 = calcAvg(scores[1]);
  displayAvg(s1, s2);
}

update();
