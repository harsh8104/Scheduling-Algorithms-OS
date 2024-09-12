const fileSelect = document.getElementById('fileSelect');
const output = document.getElementById('output');

function loadFile(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Error loading file: ${xhr.statusText}`));
        }
      }
    };
    xhr.send();
  });
}

fileSelect.addEventListener('change', async () => {
  const selectedFile = fileSelect.value;
  if (selectedFile) {
    try {
      const data = await loadFile(selectedFile);
      output.innerHTML = '';
      const frame = document.createElement('iframe');
      frame.srcdoc = data;
      frame.style.width = '100%';
      frame.style.height = '500px';
      output.appendChild(frame);
    } catch (error) {
      console.error('Error:', error);
      output.innerHTML = 'Error loading file.';
    }
  } else {
    output.innerHTML = '';
  }
});