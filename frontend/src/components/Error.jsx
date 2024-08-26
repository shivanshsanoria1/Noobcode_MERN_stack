import classes from './css/Error.module.css'

function Error({ message = 'Something went wrong :(' }) {
  return (
    <div className={classes.ErrorBox}>
      <h1 className={classes.ErrorText}>
        { message }
      </h1>
    </div>
  )
}

export default Error