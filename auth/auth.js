function verifyToken(req) {
  const token = req.headers['x-access-token'];

  if (!token)
    return { auth: false, status: 403, message: 'No token provided.' };
  else if (token != process.env.AUTH_TOKEN)
    return { auth: false, status: 500, message: 'Failed to authenticate token.' };
  else
    return { auth: true, status: 200, message: "" };
}

module.exports.verifyToken = verifyToken;