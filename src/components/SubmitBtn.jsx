import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation()
  const isSumitting = navigation.state === 'submitting'
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block uppercase"
      disabled={isSumitting}
    >
      {isSumitting ? (
        <span className="loading loading-spinner">sending...</span>
      ) : (
        text || 'submit'
      )}
    </button>
  )
}
export default SubmitBtn
