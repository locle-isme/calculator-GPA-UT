<template>
  <VModal @close="$emit('close')" @handleSubmit="updateCourse">
    <template #title>Sửa môn {{ course.name }}</template>
    <template #default="{max_credit,marks}" @close="$emit('close')">
      <div class="mark-container mt-3">
        <div class="row mb-2">
          <div class="col-12 col-md-4 mt-1">
            <input v-model="temp_course.name" type="text" class="form-control form-control-sm" placeholder="Tên môn">
          </div>
          <div class="col-12 col-md-4 mt-1">
            <select v-model="temp_course.credit" class="form-select form-select-sm">
              <option value="0" selected>Số tín chỉ</option>
              <template v-for="credit in max_credit">
                <option :value="credit" :key="'credit' + credit">{{
                    credit
                  }}
                </option>
              </template>
            </select>
          </div>
          <div class="col-12 col-md-4 mt-1">
            <select v-model="temp_course.mark" class="form-select form-select-sm">
              <option value="-1">Điểm</option>
              <template v-for="mark in marks">
                <option :value="mark.value" :key="'credit' + mark.value">
                  {{ mark.label }} ({{ mark.value.toFixed(1) }}) / {{ mark.description }}
                </option>
              </template>
            </select>
          </div>
        </div>
      </div>
    </template>
  </VModal>
</template>

<script>
import VModal from "./VModal";

export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      temp_course: {}
    }
  },
  created() {
    this.temp_course = {...this.course};
    this.temp_course.mark = parseFloat(this.temp_course.mark);
  },

  methods: {
    validation() {
      const {name, mark, credit} = this.temp_course;
      return !(name.trim() && mark > -1 && credit > 0);
    },
    updateCourse() {
      if (this.validation()) {
        return this.toastError('Nhập thiếu thông tin ở đâu đó mất rồi');
      }

      this.$emit('handleUpdateCourse', this.temp_course);
    }
  },
  components: {
    VModal
  }
}
</script>

<style lang="scss">

</style>