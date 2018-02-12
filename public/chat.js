// Make connection
const socket = io.connect('http://127.0.0.1:4000');

// Query DOM
const msg = document.getElementById('message'),
      hdl = document.getElementById('handle'),
      otp = document.getElementById('output'),
      btn = document.getElementById('send'),
      fdb = document.getElementById('feedback');

// Emit event

btn.addEventListener('click', () => {
    socket.emit('chat', {
      message: msg.value,
      handle: hdl.value
    });
    msg.value = "";
}, false);

msg.addEventListener('input', () => {
    socket.emit('typing', hdl.value);
}, false);

msg.addEventListener('keyup', () => {
    socket.emit('no_write', hdl.value);
}, false);

// Listen for addEventListener

socket.on('chat', (data) => {
  fdb.innerHTML = "";
  otp.innerHTML += `<p><strong>${data.handle} : </strong>${data.message}</p>`;
});

socket.on('typing', (data) => {
  fdb.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});

socket.on('no_write', (data) => {
  window.setTimeout(() => {
    fdb.innerHTML = "";
  }, 4000);
});
