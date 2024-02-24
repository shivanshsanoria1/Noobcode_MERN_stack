import classes from './css/Error.module.css'

function Error({ message = 'Something went wrong :(' }) {
  return (
    <div className={classes.ErrorBox}>
      <h2 className={classes.ErrorText}>
        { message }
      </h2>
    </div>
  )
}

export default Error