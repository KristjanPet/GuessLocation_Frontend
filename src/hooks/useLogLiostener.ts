import { debounce } from 'lodash'
import { useEffect } from 'react'
import * as API from 'api/Api'
import authStore from 'stores/auth.store'

export interface EventPayload {
  component: string | null
  url: string
  action: string
}

const useLogListener = () => {
  useEffect(() => {
    const handleEvent = (event: Event, action: string) => {
      const target = event.target as HTMLElement
      let element: string | null

      if (target.tagName) {
        element = target.tagName.toLowerCase()
      } else {
        element = null
      }

      const payload: EventPayload = {
        component: element,
        url: window.location.href,
        action,
      }

      if (authStore.user) {
        // This is where you'd make your API call to send the data to your backend.
        // This is just a placeholder console log.
        console.log('Sending data to backend', payload)
        API.createLog(payload)
      }
    }

    const debouncedHandleScroll = debounce(
      (event: Event) => handleEvent(event, 'scroll'),
      500,
    )

    const handleClick = (event: MouseEvent) => handleEvent(event, 'click')
    const handleInput = (event: Event) => handleEvent(event, 'input')
    const handleScroll = (event: Event) => debouncedHandleScroll(event)

    // Add event listeners for clicks, input changes, and scrolls
    document.addEventListener('click', handleClick)
    document.addEventListener('input', handleInput)
    window.addEventListener('scroll', handleScroll)

    // Remove event listeners when the component is unmounted
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('input', handleInput)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

export default useLogListener
