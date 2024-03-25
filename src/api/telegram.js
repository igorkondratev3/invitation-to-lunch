import { repository } from '@/api/base'

export default {
  async sendMessage(msg) {
    const { data } = await repository.post(`https://api.telegram.org/bot6790746136:AAFLGTOgB13DYbYDkp3zNvN1hcn4twiRiJg/sendMessage?chat_id=5916109275&parse_mode=html&text=${msg}
`)
    return data
  }
}
