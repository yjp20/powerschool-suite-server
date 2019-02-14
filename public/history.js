
function getScores() {
  n1 = 0;
  d1 = 0;

  n2 = 0;
  d2 = 0;

  hTable = document.getElementsByTagName('tbody')[0];
  grades = hTable.getElementsByTagName('tr');

  for (var idx=0; idx<grades.length; idx++) {
    grade = grades[idx];
    cols = grade.getElementsByTagName('td');

    val1 = parseInt(cols[1].innerText)
    if (!isNaN(val1)) {
      wt = 1;
      if (d1 == 8) wt = 0.5;
      n1 += parseInt(val1) * wt;
      d1 += wt;
    }

    val2 = parseInt(cols[5].innerText)
    if (!isNaN(val2)) {
      wt = 1;
      if (d2 == 8) wt = 0.5;
      n2 += parseInt(val2) * wt;
      d2 += wt;
    }
  }

  console.log(n1/d1, n2/d2);
  console.log(n1, d1, n2, d2);

  return [n1/d1, n2/d2];
}

function textformat(val) {
  return +(Math.round(val+'e+3') + 'e-3');
}

function showScores(gp1, gp2)  {
  hHead = document.getElementsByTagName('thead')[0]

  tr1 = document.createElement('tr')

  h1 = document.createElement('th')
  h1.setAttribute('class', 'bold center')
  h1.setAttribute('style', 'font-size: 16px')
  h1.innerText = textformat((gp1+gp2)/2)

  h2 = document.createElement('th')
  h2.setAttribute('class', 'center')
  h2.setAttribute('style', 'font-weight:400')
  h2.setAttribute('colspan', '4')
  h2.innerText = textformat(gp1)

  h3 = document.createElement('th')
  h3.setAttribute('class', 'center')
  h3.setAttribute('style', 'font-weight:400')
  h3.setAttribute('colspan', '4')
  h3.innerText = textformat(gp2)


  hHead.childNodes[0].before(tr1);
  tr1.appendChild(h1)
  tr1.appendChild(h2)
  tr1.appendChild(h3)
}

s = getScores()
showScores(s[0], s[1])
