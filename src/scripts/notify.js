import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const defaultConfig = {
  message: '',
  type: 'info',
  autoClose: 3000,
  position: toast.POSITION.BOTTOM_LEFT
}

export const notify = userConfig => {
  const config = { ...defaultConfig, ...userConfig }
  toast(config.message, config)
}
