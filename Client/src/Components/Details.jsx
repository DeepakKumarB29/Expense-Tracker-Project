const Details = ({ formData, onChange, buttonText }) => {
  return (
    <>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        required
      />

      <button type="submit">{buttonText}</button>
    </>
  );
};

export default Details;
