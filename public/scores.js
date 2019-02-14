console.log('powerschool-suite');
cData = {};
out = {};

function getcData() {
  try {
    return angular.element(
      document.querySelector(
        '[data-ng-controller=studentAssignmentScoresController]'
      )
    ).scope().studentAssignmentScoresCtrlData
  } catch(e) { }
}

function calcScores(cData) {
  out = {};
  for (x in cData.studentAssignments) {
    assignment = cData.studentAssignments[x]._assignmentsections[0];
    category = assignment._assignmentcategoryassociations[0];
    score = assignment._assignmentscores[0];
    if (out[category._teachercategory.name] == undefined) {
      out[category._teachercategory.name] = [0, 0];
    }
    if (!isNaN(score.scorepoints) && assignment.iscountedinfinalgrade) {
      out[category._teachercategory.name][0] += score.scorepoints;
      out[category._teachercategory.name][1] += assignment.totalpointvalue;
    }
  }
  return out;
}

function displayPartials(partials) {
  table = document.createElement('table');

  tr = document.createElement('tr');
  t1 = document.createElement('th');
  t2 = document.createElement('th');
  t3 = document.createElement('th');
  t1.innerText = 'Category';
  t2.innerText = 'Score';
  t3.innerText = 'Weighting';
  tr.appendChild(t1);
  tr.appendChild(t2);
  tr.appendChild(t3);
  table.appendChild(tr);

  for ( elem in partials ) {
    x = partials[elem];
    if (x[1] !== 0) {
      tr = document.createElement('tr');
      t1 = document.createElement('td');
      t2 = document.createElement('td');
      t3 = document.createElement('td');
      inp = document.createElement('input');
      t1.innerText = elem;
      t2.innerText = (x[0]/x[1]*100);
      t3.appendChild(inp);
      tr.appendChild(t1);
      tr.appendChild(t2);
      tr.appendChild(t3);

      table.appendChild(tr);
    }
  }

  box = document.getElementsByClassName('box-round')[0];
  box.insertBefore(table, box.firstChild);
}

function toggleHideFormative() {
  hidden = document.getElementById('hideformative').dataset.hidden == 'true';
  hideFormative(!hidden);
}

function hideFormative(hide) {
  button = document.getElementById('hideformative');
  button.dataset.hidden = hide;

  for (i in cData.studentAssignments) {
    var assignment = cData.studentAssignments[i]._assignmentsections;
    for (j in assignment) {
      if (!assignment[j].iscountedinfinalgrade) {
        var row = document.getElementById('assignmentsection_' + assignment[j].assignmentsectionid);
        if (hide) row.setAttribute('style', 'display:none');
        else      row.removeAttribute('style');
      }
    }
  }
}

function loadFormativeCookie() {
  // TOOD
  return true;
}

function addHideFormative() {
  val = loadFormativeCookie();

  button = document.createElement('button');
  button.id = 'hideformative';
  button.setAttribute('style', 'padding:10px');
  button.setAttribute('onClick', 'toggleHideFormative()');
  button.innerText = 'Toggle Show Formative';

  box = document.getElementsByClassName('box-round')[0];
  box.insertBefore(button, box.firstChild);
  hideFormative(val);
}

function update() {
  cData = getcData();
  if ( cData == null || cData == undefined || !cData.loaded ) return false;
  partials = calcScores(cData);
  displayPartials(partials)
  return true;
}

function checkUntilInit() {
  timer = setInterval(function() {
    if (update()) {
      window.clearInterval(timer);
      addHideFormative();
    }
  }, 100);
}

window.addEventListener("load", checkUntilInit, false);
