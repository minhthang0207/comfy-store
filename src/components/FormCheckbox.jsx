const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control items-center ">
      <label
        htmlFor={name}
        className="cursor-pointer label flex items-center flex-col gap-y-1"
      >
        <span className="label-text capitalize">{label}</span>
        <input
          name={name}
          id={name}
          type="checkbox"
          defaultChecked={defaultValue}
          className={`checkbox checkbox-primary ${size}`}
        />
      </label>
    </div>
  )
}
export default FormCheckbox
