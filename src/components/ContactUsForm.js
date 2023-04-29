import { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/app.css";
import { nanoid } from "nanoid";
import axios from "axios";

// const initialValues = {
//     id: nanoid(),
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
// }

// console.log(initialValues)

const ContactForm = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = { ...data, id: nanoid() };
    // console.log(data);
    axios
      .post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        { formData }
      )
      .then((response) => {
        console.log(response);
        setSuccessMsg("User Submission is successful.");
        setErrorMsg("");
      })
      .catch(() => {
        setSuccessMsg("");
        setErrorMsg("User Submission was not successful!! ");
      });

    reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        {errorMsg && <p className="info-error-msg">{errorMsg}</p>}
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                message: "Name is required.",
              },
            })}
          />
          {errors.name && <p className="errorMsg">{errors.name.message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="input-field">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" />
        </div>

        <div className="input-field">
          <label htmlFor="feedback">Message</label>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your Message"
            {...register("feedback", {
              required: "Message is required.",
              pattern: {
                message: "Message is required.",
              },
            })}
          ></textarea>
          {errors.feedback && (
            <p className="errorMsg">{errors.feedback.message}</p>
          )}
        </div>

        <div className="input-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
