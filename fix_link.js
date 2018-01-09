
let dom_ready = new Promise(resolve => {
  function check() {
    if (document.readyState === 'interactive' ||
        document.readyState === 'complete') {
      document.removeEventListener('readystatechange', check);
      resolve();
    }
  }

  document.addEventListener('readystatechange', check);
  check();
});

function makeBoard(url) {
  let frame = document.createElement('iframe');
  frame.setAttribute('style', 'position: absolute; width: 100%; height: 100%; top: 0px; left: 0px;');
  document.body.appendChild(frame);

  let doc = frame.contentDocument;
  let obj = doc.createElement('object');
  obj.setAttribute('data', url);
  obj.width = '100%';
  obj.height = '100%';
  doc.body.appendChild(obj);

  let close = doc.createElement('button');
  close.textContent = 'close';
  close.setAttribute('style', 'position: absolute; left: 10px; top: 10px;');
  close.addEventListener('click', () => {
    frame.parentElement.removeChild(frame);
  });
  doc.body.appendChild(close);
}

(async () => {
  await dom_ready;
  for (let x of Array.from(document.querySelectorAll('a[href^="/swf/"]'))) {
    let url = x.href;
    x.removeAttribute('onclick');
    x.removeAttribute('href');

    let y = x.cloneNode(true);
    x.parentElement.replaceChild(y, x);

    y.addEventListener('click', makeBoard.bind(null, url));
  }
})();
