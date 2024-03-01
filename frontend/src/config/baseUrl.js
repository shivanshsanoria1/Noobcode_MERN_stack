const baseUrl = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_BACKEND_ORIGIN

export default baseUrl

/*
# in development mode: frontend and backend are at different origins
  like Reactjs at port 3000 and Nodejs at port 8000

# in production mode: frontend is at the same origin as backend
  like Reactjs and Nodejs at port 8000
*/