window.addEventListener("load", () => {
  const loginForm = document.getElementById("login-form");
  const errorElement = document.getElementById("error-message");
  errorElement.innerHTML = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = loginForm.elements.email.value;
    const password = loginForm.elements.password.value;
    const endpoint = "https://apptesting.docsumo.com/api/v1/eevee/login/";
    const request = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    await fetch(endpoint, request)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          errorElement.innerHTML = data.error;
        } else if (data.status === "success") {
          errorElement.innerHTML = "";
          const newTab = window.open("");
          newTab.document.write(`Hello ${data.data.user.full_name}`);
        }
      });
  };

  if (loginForm) {
    loginForm.addEventListener("submit", handleSubmit);
  }
});
