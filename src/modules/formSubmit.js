export function initFormSubmit() {
  const forms = document.querySelectorAll("form");

  if (!forms) {
    return;
  }

  forms.forEach((form) => {
    const formSubmitButton = form.querySelector(".button.is-submit");
    const submitButton = form.querySelector(".form_submit");
    const label = form.querySelector(".button_label");

    if (!formSubmitButton || !submitButton) {
      return;
    }
  
    // add event listener to the form submit button
    formSubmitButton.addEventListener("click", function (e) {
      e.preventDefault(); // prevent the default action
      // check if the form is valid
      if (form.checkValidity()) {
        // if valid, submit the form and change the button text
        submitButton.click();
        
        label.textContent = submitButton.getAttribute("data-wait");
      } else {
        // if not valid, report validity (this will show the HTML5 validation messages)
        form.reportValidity();
      }
    });

    // form.addEventListener("submit", function () {
    //   // scroll screen back to the top of the using Lenis.js scrollTo method
    //   const formTop = form.getBoundingClientRect().top;
    //   lenis.scrollTo(formTop, 500);
    // });
  });

}