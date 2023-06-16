import { FC, useState } from 'react'
import * as API from 'api/Api'
import Popup from 'reactjs-popup'
import { StatusCode } from 'constants/errorConstants'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { EventPayload } from 'hooks/useLogLiostener'

const SettingsForm: FC = () => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)

  const [logData, setLogData] = useState<EventPayload[]>()

  //USER INFO CHANGE
  const { handleSubmit, register } = useForm<{ userId: string }>({
    defaultValues: {
      userId: '',
    },
  })

  const onSubmit = async (data: { userId: string }) => {
    const response = await API.getLog(data.userId)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      setLogData(response.data.data)
      console.log(response.data.data)
    }
  }

  const onClose = () => {
    setWindowOpen(false)
    setShowError(false)
    setLogData(undefined)
  }

  return (
    <>
      <button onClick={() => setWindowOpen(true)}>Users log</button>

      {/* LOG */}
      <Popup modal nested className="relative" open={windowOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => onClose()}
        />

        <div className="flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-[80rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <div className=" text-dark">
              <p className=" text-4xl">
                User <span className=" text-primary">log.</span>{' '}
              </p>
            </div>

            <div className="grid grid-flow-col items-center gap-4 my-4 text-sm">
              <div className=" ">
                <Form.Group className=" flex flex-col">
                  <input
                    type="text"
                    placeholder="User ID"
                    aria-label="userID"
                    aria-describedby="userID"
                    className=" w-full  pt-2 border-b-2 border-gray-300 mt-4"
                    {...register('userId')}
                  />
                </Form.Group>
                {showError && <div className="text-danger">{apiError}</div>}
              </div>

              <div className=" ">
                <button
                  className=" bg-primary py-2 px-7 text-white rounded"
                  type="submit"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="border border-slate-700 w-full h-full max-h-96 overflow-y-auto p-5">
            {logData && logData.length > 0 ? (
              <div>
                {logData.map((log: EventPayload) => (
                  <div key={log.id}>{JSON.stringify(log)}</div>
                ))}
              </div>
            ) : (
              <p>No logs yet</p>
            )}
          </div>
        </div>
      </Popup>
    </>
  )
}

export default SettingsForm
