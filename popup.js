chrome.tabs.query({
  active       : true,
  currentWindow: true
}, function (tabs) {
  var url = tabs[0].url;
  var qr  = document.getElementById("qr");
  var txt = qr.querySelector('textarea');
  var img, qrcode;

  txt.value = url;

  function showMain() {
    img.classList.remove('hide');
    txt.style.display = 'none';

    var val = txt.value.trim();
    qrcode.makeCode(val ? val : url);
  }

  function showInput() {
    img.classList.add('hide');
    txt.style.display = 'block';

    txt.value = txt.value.trim();
    txt.select();
  }

  chrome.storage.sync.get(function (options) {
    var color;
    if (options && options.isBlack) {
      color = '#000000';
    } else {
      color = randomColor({
        luminosity: 'dark'
      });
    }

    qrcode = new QRCode(qr, {
      text        : url,
      width       : 240,
      height      : 240,
      colorDark   : color,
      colorLight  : "#ffffff",
      correctLevel: QRCode.CorrectLevel.L
    });

    qr.querySelector('canvas').remove();

    img = qr.querySelector('img');
    img.addEventListener('click', showInput);
  });

  document.addEventListener('keypress', function (e) {
    if (e.which !== 13) {
      return;
    }

    // fix enter new line
    e.preventDefault();

    if (img.classList.contains('hide')) {
      showMain();
    } else {
      showInput();
    }
  });
});
