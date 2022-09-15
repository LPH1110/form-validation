// Function Constructor
function Validator(options) {
  const $ = document.querySelector.bind(document);

  let formElement = $(options.form);
  let submitBtn = formElement.querySelector(".submit-btn");
  let selectorRules = {}; // an obj to save functions of selector

  // getParent() to get parentElement according to selector
  const getParent = (inputElement, selector) => {
    if (inputElement.parentElement.matches(selector)) {
      return inputElement.parentElement;
    } else {
      return getParent(inputElement.parentElement, selector);
    }
  };

  const clearValidate = (inputElement) => {
    let formMessage = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.messageHolderSelector);

    formMessage.innerText = "";
    inputElement.classList.remove("invalid");
  };

  const validate = (inputElement, rule) => {
    let errorMessage = undefined;
    let formMessage = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.messageHolderSelector);

    // Get all functions of selector
    let rules = selectorRules[rule.selector];

    // Loop through each functions and find whether it has errorMessage
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      formMessage.innerText = errorMessage;
      inputElement.classList.add("invalid");
    } else {
      formMessage.innerText = "";
      inputElement.classList.remove("invalid");
    }

    return !!errorMessage;
  };

  if (formElement) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      switch (submitBtn.innerText) {
        case "Log in":
          let isInvalid = false;
          let isFormValid = true;
          // Loop over each rules to validate all
          options.rules.forEach((rule) => {
            let inputElement = $(rule.selector);
            isInvalid = validate(inputElement, rule);
            if (isInvalid) {
              isFormValid = false;
            }
          });

          if (isFormValid) {
            let formInputs = Array.from(
              formElement.querySelectorAll("[name]:not([disabled])")
            );

            let formValues = formInputs.reduce((values, input) => {
              values[input.name] = input.value;
              return values;
            }, {});

            options.onSubmit(formValues);
          }
          break;
        default:
          break;
      }
    });

    // Loop over each rules; rule = {selector, test()}
    options.rules.forEach((rule) => {
      let inputElement = $(rule.selector);

      // Save selector + rule functions to selectorRules
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        // assign an array to rule.selector at the first time
        selectorRules[rule.selector] = [rule.test];
      }

      if (inputElement) {
        inputElement.addEventListener("blur", () => {
          validate(inputElement, rule);
        });

        inputElement.addEventListener("input", () => {
          clearValidate(inputElement);
        });
      }
    });
  }
}

Validator.isRequired = (selector) => {
  return {
    selector,
    test(value) {
      return value.trim() ? undefined : "Please enter this field";
    },
  };
};

// test() throws error message

Validator.isEmail = (selector) => {
  return {
    selector,
    test(value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "This field must be an email";
    },
  };
};

Validator.minLength = (selector, min) => {
  return {
    selector,
    test(value) {
      return value.length >= min
        ? undefined
        : "This field requires at least 8 characters";
    },
  };
};

export default Validator;
