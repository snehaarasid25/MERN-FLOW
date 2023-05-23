import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserDetail({
        ...userDetail,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetail({
      ...userDetail,
      [name]:value
     
    });
  };

  //sending the data to backend(message)
  const contactForm=async(e)=>{
    e.preventDefault();

    const{name,email,phone,message}=userDetail;
    const res=await fetch("/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,phone,message
      })
    })

    const data=await res.json();
    
    if(!data){
      console.log("Message not sent");
    }
    else{
      alert("Message Sent")
      setUserDetail({...userDetail,message:""})
    }
    


  }

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone number */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">+91 0507 341 2002</div>
                </div>
              </div>

              {/* email */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">
                    araseedsneha@gmail.com
                  </div>
                </div>
              </div>

              {/* address */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/24/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Solapur MH India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* form for contact us */}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get In Touch</div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact-form-name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userDetail.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      required="true"
                    />

                    <input
                      type="email"
                      id="contact-form-email"
                      className="contact_form_email input_field"
                      name="email"
                      value={userDetail.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required="true"
                    />

                    <input
                      type="number"
                      id="contact-form-phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userDetail.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone"
                      required="true"
                    />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      value={userDetail.message}
                      onChange={handleInputs}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button" 
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
