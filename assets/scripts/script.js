import Validator from "./Validator.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const footerSignUp = $(".footer_signup");
const authHeading = $(".auth_heading");
const toggleHyperlink = $("#toggeHyperlink");
const footerTitle = $(".footer_title");
const linerText = $(".liner_text");
const formControl = $(".form-control");
const authWrapper = $(".auth_wrapper");
const authLiner = $(".auth_liner");
const authFooter = $(".auth_footer");
const submitBtn = $(".submit-btn");
const authSocialWrapper = $(".auth_social-wrapper");
const socials = $$(".social");
const socialTexts = $$(".social_text");
const socialThumbnails = $$(".social_thumbnail");

// const descriptions = [
//   "Free forever",
//   "Professional results in minutes",
//   "Loved by 15+ million users",
// ];

const socialTitles = ["Google", "Facebook", "ID Apple"];

const socialSignUpStyle = {
  margin: 0,
  marginBottom: "15px",
  justifyContent: "space-between",
};

const socialLogInStyle = {
  marginBottom: 0,
  marginLeft: "15px",
  justifyContent: "center",
};

const SignUpInterface = {
  authHeading: "Sign Up",
  linerText: "or",
  submitBtn: "Sign up with email",
  footerTitle: "Already have an account?",
  toggleHyperlink: "Log In",
};

const LogInInterface = {
  authHeading: "Welcome back!",
  linerText: "Log in with",
  submitBtn: "Log in",
  footerTitle: "Don't have an account?",
  toggleHyperlink: "Sign Up",
};

toggleHyperlink.addEventListener("click", () => {
  if (toggleHyperlink.innerText == "Sign Up") {
    // Sign up page
    authHeading.innerText = SignUpInterface.authHeading;
    linerText.innerText = SignUpInterface.linerText;
    submitBtn.innerText = SignUpInterface.submitBtn;
    footerTitle.innerText = SignUpInterface.footerTitle;
    toggleHyperlink.innerText = SignUpInterface.toggleHyperlink;
    formControl.style.display = "none";
    authSocialWrapper.style.flexDirection = "column";

    socials.forEach((social) => {
      Object.assign(social.style, socialSignUpStyle);
    });

    for (let i = 0; i < socialTitles.length; i++) {
      socialTexts[i].innerText = `Continue with ${socialTitles[i]}`;
      socialTexts[i].style.flex = 1;
    }

    socialThumbnails.forEach(
      (thumbnail) => (thumbnail.style.marginLeft = "20px")
    );

    authWrapper.appendChild(authSocialWrapper);
    authWrapper.appendChild(authLiner);
    authWrapper.appendChild(submitBtn);
    authWrapper.appendChild(authFooter);
  } else {
    // Log in page
    authHeading.innerText = LogInInterface.authHeading;
    linerText.innerText = LogInInterface.linerText;
    submitBtn.innerText = LogInInterface.submitBtn;
    footerTitle.innerText = LogInInterface.footerTitle;
    toggleHyperlink.innerText = LogInInterface.toggleHyperlink;
    formControl.style.display = "block";
    authSocialWrapper.style.flexDirection = "row";

    socials[0].style.marginBottom = "0";
    socials[0].style.justifyContent = "center";

    for (let i = 1; i < socials.length; i++) {
      Object.assign(socials[i].style, socialLogInStyle);
    }

    for (let i = 0; i < socialTitles.length; i++) {
      socialTexts[i].innerText = ``;
      socialTexts[i].style.flex = 0;
    }
    socialThumbnails.forEach((thumbnail) => (thumbnail.style.marginLeft = "0"));

    authWrapper.appendChild(authLiner);
    authWrapper.appendChild(authSocialWrapper);
    authWrapper.appendChild(authFooter);
  }
});

// Validator
Validator({
  form: "#form-1",
  formGroupSelector: ".form-group",
  messageHolderSelector: ".form_message",
  rules: [
    Validator.isRequired("#email"),
    Validator.isEmail("#email"),
    Validator.isRequired("#password"),
    Validator.minLength("#password", 8),
  ],
  onSubmit(data) {
    console.log("submitted data: " + data);
  },
});
