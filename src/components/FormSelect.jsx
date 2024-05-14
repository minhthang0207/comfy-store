const FormSelect = ({ label, name, defaultValue, list, size }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item} className="">
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default FormSelect
