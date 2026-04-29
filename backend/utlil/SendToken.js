
export const sendToken = (user, status, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  return res
    .status(status)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
     // optional (useful for testing / Postman)
    });
};


/*
. Cookie options
const options = {
  expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

👉 This configures the cookie:

expires → when cookie should expire
httpOnly: true → 🔒 prevents JavaScript (frontend) from accessing the cookie (security against XSS)
What happens when this runs
👉 Flow:
User logs in
Server generates JWT

Server sends cookie:

token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Browser stores cookie automatically
On future requests → cookie is sent automatically
You verify token in middleware → user stays logged in
*/