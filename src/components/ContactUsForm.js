import { useState} from "react";
import { useForm } from "react-hook-form";
import "../styles/app.css";

const ContactForm = () => {

  const [successMsg, setSuccessMsg] = useState("");
  // const [errorMsg, setErrorMsg] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors }, reset 
  } = useForm();

  // const { reset } = useForm();
  // reset({
  //   name: "",
  //   email: "",
  //   subject: "",
  //   message: ""
  // })

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMsg("User registration is successful.");
    reset();
    // setErrorMsg(false)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
      {successMsg && <p className="success-msg">{successMsg}</p>}
      {/* {!errorMsg && <p>User Submission is not successful.</p>} */}
        <div className="input-field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name='name'
            {...register("name", { required: "Name is required", 
          pattern: {
            message: "Name is required."
          } })}
          />
          {errors.name && 
            <p className="errorMsg">{errors.name.message}</p>
          }
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
                message: "Email is not valid."
              }
            })}
          />
          {errors.email &&
            <p className="errorMsg">{errors.email.message}</p>
          }
        </div>
        <div className="input-field">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" />
        </div>

        <div className="input-field">
          <label htmlFor="feedback">Message</label>
          <input
            type="text"
            name='feedback'
            {...register("feedback", { required: "Message is required.",
          pattern: {
            message: "Message is required."
          } })}
          />
           {errors.feedback && 
            <p className="errorMsg">{errors.feedback.message}</p>
          }
        </div>

        {/* <div className="input-field">
          <label>Message</label>
          <textarea placeholder="Enter your Message"></textarea>
        </div> */}

       <div className="input-field">
       <button type="submit" >Submit</button>
       </div>
      </form>
    </div>
  );
};

export default ContactForm;
