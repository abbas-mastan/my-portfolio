import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import emailjs from "@emailjs/browser";


const Contact = () => {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send('serviceid', 'template',
      {
        from_name: form.name,
        to_name: 'Muhammad Abbas',
        to_email: 'contact@muhammadabbas@develeper.pro',
        message: form.message,
      },
        'public_key'
      ).then(()=>{
        setLoading(false);
        alert('Thank you. I will get back to you as soon as possible');
        setForm({
          name:"",
          email:"",
          message:"",
        })
      },(error)=>{
        setLoading(false);
        console.log(error);
        alert('something went wrong');
      })


  }
  return (
    <div className="xl:mt-12 xl:flex-row 
    flex-col-reverse flex gap-10 
    overflow-hidden ">
      <motion.div variants={slideIn('left', 'tween', 0.2, 1)}
        className={"flex-[0.75] bg-black-100 p-8 rounded-2xl"} >
        <p className={styles.sectionSubText}>Get in touchh</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8' >
          <label htmlFor="name" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text" name='name' value={form.name}
              onChange={handleChange}
              id='name' className='bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none
            border-none font-medium' placeholder="What's your name?" />
          </label>
          <label htmlFor="email" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input id='email' type="email" name='email' value={form.email}
              onChange={handleChange}
              className='bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none
            border-none font-medium' placeholder="What's your email?" />
          </label>
          <label htmlFor="message" className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea id='message' name='message' rows={7} onChange={handleChange}
              className='bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none
            border-none font-medium' placeholder="What do you want to say?" >{form.message}</textarea>
          </label>
          <button className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold
          shadow-md shadow-primary rounded-xl' type="submit">{loading ? 'Sending...' : 'Send'}</button>
        </form>
      </motion.div>
      <motion.div className='xl:flex-1 xl:h-auto md:h-[550px]'
        variants={slideIn('right', 'tween', 0.2, 1)}>
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")