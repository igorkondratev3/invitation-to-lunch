<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '00'
  },
  maxValue: {
    type: Number,
    default: 59
  },
  minValue: {
    type: Number,
    default: 0
  },
  hideTwoDote: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])

const timePartMask = { mask: '##' }

const updateModelValue = val => {
  if (val.length > 2) return
  emits('update:modelValue', normalizeTimePart(val))
}

const normalizeTimePart = val => {
  if (Number(val) > props.maxValue) return String(props.maxValue).padStart(2, '0')
  if (Number(val) < props.minValue) return String(props.minValue).padStart(2, '0')
  return String(val).padStart(2, '0')
}
</script>

<template>
  <v-btn
    class="time-part-button"
    icon="mdi-chevron-up"
    :disabled="Number(modelValue) >= maxValue"
    @click="updateModelValue(String(Number(modelValue) + 1))"
  ></v-btn>
  <v-text-field
    class="base-input time-part"
    variant="outlined"
    density="compact"
    hide-details
    :min="minValue"
    :max="maxValue"
    v-maska:[timePartMask]
    :model-value="modelValue"
    @update:modelValue="updateModelValue"
    @keydown.up="updateModelValue(String(Number(modelValue) + 1))"
    @keydown.down="updateModelValue(String(Number(modelValue) - 1))"
  />
  <v-btn
    class="time-part-button"
    icon="mdi-chevron-down"
    :disabled="Number(modelValue) <= minValue"
    @click="updateModelValue(String(Number(modelValue) - 1))"
  ></v-btn>
  <span
    v-if="!hideTwoDote"
    class="time-part-two-dote"
    >:</span
  >
</template>

<style>
.time-part input {
  width: 64px !important;
  font-size: 20px !important;
  text-align: center;
  border-radius: 8px !important;
}

.time-part-button {
  color: var(--black);
}

.time-part-two-dote {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -60%);
  font-size: 32px;
  font-weight: 700;
}
</style>
