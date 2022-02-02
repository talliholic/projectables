async function postData() {
  const secret = prompt("Enter the secret phrase:");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phrase: secret.trim() }),
  };
  try {
    const response = await fetch("/phrase", requestOptions);
    const data = await response.json();
    if (data.phrase === "healthy") {
      window.location.href = "./";
    } else {
      alert("Check the secret phrase or ask your teacher.");
      location.reload();
    }
  } catch (error) {}
}

postData();
