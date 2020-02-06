const spinner = document.getElementById("spinner");
const downloadBtn = document.querySelector("#downloadBtn");
const content_output = document.querySelector(".content-output");

// Handle form submit and display data back to client
myForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // spinner animation
  spinner.classList.toggle("active");

  // getting value from form
  const input = myForm.getElementsByTagName("input").test_url.value;
  var data = { test_url: input };
  data = JSON.stringify(data);

  // hitting api endpoint with url of interest
  fetch("/api", {
    method: "post",
    body: data,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.text();
    })
    .then(data => {
      let formatted = data;
      console.log(formatted);
      updateUI();
      document.getElementById("output").innerText = formatted;
    })
    .catch(err => {
      console.log(err);
      alert(err);
    });
});

function updateUI() {
  downloadBtn.classList.toggle("active");
  spinner.classList.toggle("active");
  content_output.classList.toggle("active");
}

downloadBtn.addEventListener("click", () => {
  fetch("./temp/app.scss")
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "app.scss";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => alert("Error Occured"));
});
