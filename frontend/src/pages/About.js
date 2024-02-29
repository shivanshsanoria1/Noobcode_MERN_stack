import classes from './css/About.module.css'
import emailLogo from '../logos/email_logo.svg'
import githubLogo from '../logos/github_logo.svg'
import linkedinLogo from '../logos/linkedin_logo.svg'

function AboutPage() {
  const myGithubLink = 'https://github.com/shivanshsanoria1/Noobcode_MERN_stack'
  const myLinkedinLink = 'https://www.linkedin.com/in/shivansh-sanoria-948343245/'
  const myContactEmail = 'contact_noobcode@gmail.com'

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        About
      </div>
      <div className={classes.content}>
        NoobCode is a simple and ad-free website to find solutions of various problems from 
        <a href="https://leetcode.com/problemset/" target="_blank" rel="noopener noreferrer">leetcode.com</a>
      </div>
      <br/>
      <div className={classes.content}>
        All the solutions found here can be categorized into 3 types:
      </div>
      <div className={classes.content}>
        <ul>
          <li>
            DSA (Data Structure and Algorithms) problems available in C++ language.
          </li>
          <li>
            Databse problems available in MySQL.
          </li>
          <li>
            Javascript specific problems available in Javascript.
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        This MERN stack (MongoDB, Express.js, React, Node.js) website and all the solutions found here are developed by me.
      </div>

      <br/>
      <br/>

      <div className={classes.heading}>
        How to use ?
      </div>
      <div className={classes.content}>
        Just enter the question number which you are stuck at in the search bar to get the solutions. No need to create an account just start learning.
      </div>
      <div className={classes.content}>
      Multiple solutions are available here for various problems to help you find different ways to approach the problem.
      </div>
      <div className={classes.content}>
        Solutions are arranged in order from least optimized to most optimized.
      </div>
      <div className={classes.content}>
      Don't underestimate the power of Brute-force / Unaccepted solutions, analyze them and try to find a way to optimize to reach to the Accepted version.
      </div>
      <div className={classes.content}>
      The best way to learn is to use the solutions found here only as a reference. Just copy pasting the code won't help you learn.
      </div>

      <br/>
      <br/>

      <div className={classes.heading}>
        Contact
      </div>
      <div className={classes.content}>
        Incase you find any solution to be wrong, not working, report bugs or any other suggestion.
      </div>
      <div className={classes.content}>
      Please send an email at: { myContactEmail }
      </div>

      <br/>
      <hr className={classes.line} />
      
      <div className={classes.logos}>
        <a href={`mailto:${myContactEmail}?subject=Feedback`}>
          <img src={emailLogo} alt="contact email" className={classes.logo} />
        </a>
        <a href={myGithubLink} target='_blank' rel="noopener noreferrer">
          <img src={githubLogo} alt="github" className={classes.logo} />
        </a>
        <a href={myLinkedinLink} target='_blank' rel="noopener noreferrer">
          <img src={linkedinLogo} alt="linkedin" className={classes.logo} />
        </a>
      </div>
    </div>
  )
}

export default AboutPage