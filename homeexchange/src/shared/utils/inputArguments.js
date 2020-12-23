export const inputAttributes = {
  password: {
    placeholder: "password",
    name: "password",

    type: "password",
    validationAttributes: {
      minLength: "8",
      maxLength: "16",
      size: 16,
      pattern: "[0-9a-zA-Z]*",
      required: true,
      "data-permitions": "a-Z and 0-9",
    },
  },
  firstname: {
    placeholder: "firstname",
    name: "firstname",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      pattern: "[0-9a-zA-Z-_]{1,20}",
      maxLength: "20",
      required: true,
      title: "please use only numbers and English characters, also '-_'",
      "data-permitions": "a-Z 0-9 and - _ ",
    },
  },
  lastname: {
    placeholder: "lastname",
    name: "lastname",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      pattern: "[0-9a-zA-Z-_]{1,20}",
      maxLength: "20",
      required: true,
      title: "please use only numbers and English characters, also '-_'",
      "data-permitions": "a-Z 0-9 and - _ ",
    },
  },

  language: {
    placeholder: "languages1",
    name: "language",
    type: "text",
    validationAttributes: {
      autoComplete: "off",
      pattern: "[0-9a-zA-Z ]+",
      maxLength: "20",
      required: true,
      title: "please use only numbers and English characters, also '-_'",
      "data-permitions": "a-Z 0-9 and - _ ",
    },
  },

  nickname: {
    placeholder: "nickname",
    name: "nickname",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      pattern: "[0-9a-zA-Z-_]{1,20}",
      maxLength: "20",
      required: true,
      title: "please use only numbers and English characters, also '-_@$%^#!'",
      "data-permitions": "a-Z 0-9 and - _ @ $ % ^ # !",
    },
  },

  city: {
    placeholder: "city",
    name: "city",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      required: true,
    },
  },
  country: {
    placeholder: "country",
    name: "country",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      required: true,
    },
  },
  nickname: {
    placeholder: "nickname",
    name: "nickname",

    type: "text",
    validationAttributes: {
      autoComplete: "off",
      pattern: "[0-9a-zA-Z-_]{1,20}",
      maxLength: "20",
      required: true,
      title: "please use only numbers and English characters, also '-_@$%^#!'",
      "data-permitions": "a-Z 0-9 and - _ @ $ % ^ # !",
    },
  },
  email: {
    placeholder: "e-mail",
    name: "email",

    type: "email",
    validationAttributes: {
      autoComplete: "on",
      required: true,
    },
  },

  getPasswordAttributesForLogin: function () {
    console.log(this);
    let pass = { ...this.password };
    pass.validationAttributes.autoComplete = "current-password";
    return pass;
  },
  getPasswordAttributesForRegistration: function () {
    console.log(this);
    let pass = { ...this.password };
    pass.validationAttributes.autoComplete = "new-password";
    return pass;
  },
};
