export default function() {
  return process.env.REACT_APP_ENV || process.env.NODE_ENV || 'development';
}
