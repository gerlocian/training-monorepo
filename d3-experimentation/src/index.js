import './components';

const data = require('../test_data/visits.json');

document.body.style.setProperty('margin', '0');
document.body.style.setProperty('padding', '0');
document.body.style.setProperty('overflow', 'hidden');

const visitGraph = document.createElement('ger-visit-graph');
visitGraph.style.setProperty('display', 'block');
visitGraph.style.setProperty('height', '100vh');
visitGraph.style.setProperty('width', '100vw');
visitGraph.setVisits(data);
visitGraph.addEventListener('ger-visit-click', console.log);

document.body.append(visitGraph);
