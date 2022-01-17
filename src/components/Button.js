function Button({ Class, text, onClick }) {
  return (
    <button className={Class} type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
