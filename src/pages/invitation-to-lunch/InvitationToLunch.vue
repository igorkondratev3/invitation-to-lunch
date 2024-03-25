<script setup>
import { ref } from 'vue'
import { telegramApi } from '@/api'
import { notify } from '@/scripts'
import TimePicker from '@/components/ui/ui-date-time-picker/components/TimePicker.vue'

document.title = 'Приглашение на обед'

const hours = ref('00')
const minutes = ref('00')
const message = ref('')

const updateTimePart = (val, timePartType) => {
  switch (timePartType) {
    case 'hours':
      hours.value = val
      break
    case 'minutes':
      minutes.value = val
      break
  }
}

const updateMessage = val => {
  message.value = val
}

const dateArr = new Date().toDateString().split(' ')
const date = `${dateArr[2]}-${dateArr[1]}-${dateArr[3]}`
const data = JSON.parse(localStorage.getItem(date))
if (data) {
  hours.value = data[0]
  minutes.value = data[1]
  message.value = data[2]
}

const loading = ref(false)
const sendMessage = async () => {
  try {
    loading.value = true
    const msg = encodeURI(`Время: ${hours.value}:${minutes.value}\nCообщение: ${message.value}`)
    await telegramApi.sendMessage(msg)
    localStorage.setItem(date, JSON.stringify([hours.value, minutes.value, message.value]))
    notify({ message: 'Данные успешно отправлены', type: 'info' })
  } catch (e) {
    console.log(e)
    notify({ message: 'Не удалось отправить данные', type: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page-wrapper">
    <h1 class="lunch">Когда обед?</h1>
    <TimePicker
      :hours="hours"
      :minutes="minutes"
      :message="message"
      :loading="loading"
      @update:hours="val => updateTimePart(val, 'hours')"
      @update:minutes="val => updateTimePart(val, 'minutes')"
      @updateMessage="updateMessage"
      @sendMessage="sendMessage"
    />
  </div>
</template>

<style>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 8px;
  background-color: rgb(232, 238, 233);
}

.lunch {
  font-family: 'Old Standard TT CY', 'Old Standard TT LA';
  margin-bottom: 24px;
}
</style>
