export default function applicationBase(req, res, next) {
  // will run first for every route in the app
  next();
}
