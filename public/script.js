const $ = id => document.getElementById(id);

$('runSpeed').oninput = e => $('runSpeedVal').innerText = parseFloat(e.target.value).toFixed(1);
$('sens').oninput = e => $('sensVal').innerText = parseFloat(e.target.value).toFixed(2);
$('maxSpeed').oninput = e => $('maxSpeedLabel').innerText = e.target.value;

fetch('/api/device').then(r => r.json()).then(d => {
  $('ip').innerText = d.ip || '-';
  $('platform').innerText = d.platform || '-';
  $('ua').innerText = (d.userAgent || '-').slice(0, 40) + '...';
  $('time').innerText = new Date(d.timestamp).toLocaleTimeString();
}).catch(() => $('status').innerText = '● Offline');

fetch('/api/config').then(r => r.json()).then(c => {
  $('runSpeed').value = c.runSpeed;
  $('runSpeedVal').innerText = c.runSpeed.toFixed(1);
  $('sens').value = c.sensitivity;
  $('sensVal').innerText = c.sensitivity.toFixed(2);
  $('maxSpeed').value = c.maxRunSpeed;
  $('maxSpeedLabel').innerText = c.maxRunSpeed;
  $('version').innerText = c.version;
});

function saveConfig() {
  fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      runSpeed: parseFloat($('runSpeed').value),
      sensitivity: parseFloat($('sens').value),
      maxRunSpeed: parseFloat($('maxSpeed').value)
    })
  }).then(r => r.json()).then(() => {
    $('toast').innerText = '✅ Config tersimpan!';
    setTimeout(() => $('toast').innerText = '', 2500);
  });
}
