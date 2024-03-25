<script setup>
import TimePartPicker from '@/components/ui/ui-date-time-picker/components/TimePartPicker.vue'

defineProps({
  hours: String,
  minutes: String,
  loading: Boolean,
  message: String
})
defineEmits(['update:hours', 'update:minutes', 'updateMessage', 'sendMessage'])

const rusMonth = {
  Jan: 'января',
  Feb: 'февраля',
  Mar: 'марта',
  Apr: 'апреля',
  May: 'мая',
  Jun: 'июня',
  Jul: 'июля',
  Aug: 'августа',
  Sep: 'сентября',
  Oct: 'октября',
  Nov: 'ноября',
  Dec: 'декабря',
}

const dateArr = new Date().toDateString().split(' ')
const date = `${dateArr[2]} ${rusMonth[dateArr[1]]} ${dateArr[3]} г.`
</script>

<template>
  <v-card
    class="base-card time-card shadow"
  >
    <v-card-title class="date">{{ date }}</v-card-title>
    <v-card-text class='flex-column'>
      <div>
        <v-row>
          <v-col cols="6">
            <TimePartPicker
              :modelValue="hours"
              :minValue="0"
              :maxValue="23"
              @update:modelValue="val => $emit('update:hours', val)"
            />
          </v-col>
          <v-col cols="6">
            <TimePartPicker
              :modelValue="minutes"
              :minValue="0"
              :maxValue="59"
              hide-two-dote
              @update:modelValue="val => $emit('update:minutes', val)"
            />
          </v-col>
        </v-row>
      </div>
      <div class='mt-4' style='width: 100%'>
        <v-textarea
          :model-value='message'
          class="base-autocomplete"
          variant="outlined"
          hide-details
          no-resize
          density="compact"
          label="Сообщение"
          @update:modelValue="val => $emit('updateMessage', val)"
        />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="base-button fill-button"
        elevation="3"
        :loading='loading'
        @click="$emit('sendMessage')"
      >
        <v-icon
          style='margin-top: 1px'
          icon="mdi-send-circle-outline"
          size="20"
        />
        Отправить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style>
.date {
  font-family: 'Old Standard TT CY', 'Old Standard TT LA';
}

.time-card {
  height: 500px;
  width: 350px;
  display: flex !important;
  flex-direction: column;
  background-color: #d1dada !important;
}

@media (max-width: 400px) {
  .time-card {
    width: 250px;
  }
}

.time-card .v-card-text {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.time-card .v-card-actions {
  padding: 20px !important;
  box-shadow: 0px 0px 11px 0px #0000000d;
}

.time-card .v-card-title {
  display: flex;
  justify-content: center;
  padding: 16px 0px 0px 0px !important;
}

.time-card .v-card-text .v-col {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 16px !important;
}
</style>
