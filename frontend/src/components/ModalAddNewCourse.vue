<template>
  <VModal @handleSubmit="saveChange" @close="$emit('close')">
    <template #title>Thêm môn</template>
    <template #default="{max_credit, marks}">
      <div class="clearfix">
        <button class="btn btn-sm btn-primary float-end" @click="addCourse()"><i class="bi bi-plus-circle"></i>
        </button>
      </div>
      <div class="mark-container mt-3">
        <template v-for="course in temp_courses">
          <div class="row mb-2" :key="course.id">
            <div class="col-12 col-md-3 mt-1">
              <input v-model="course.name" type="text" class="form-control form-control-sm" placeholder="Tên môn">
            </div>
            <div class="col-12 col-md-4 mt-1">
              <select v-model="course.credit" class="form-select form-select-sm">
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
              <select v-model="course.mark" class="form-select form-select-sm">
                <option value="-1">Điểm</option>
                <template v-for="mark in marks">
                  <option :value="mark.value" :key="'credit' + mark.value">
                    {{ mark.label }} ({{ mark.value.toFixed(1) }}) / {{ mark.description }}
                  </option>
                </template>
              </select>
            </div>
            <div class="col-12 col-md-1 mt-1">
              <button class="btn btn-sm btn-danger text-light float-md-end" :disabled="lengthTempCourses < 2"
                      @click="removeCourse(course)">
                <i class="bi bi-eraser"></i>
              </button>
            </div>
          </div>
        </template>
      </div>
    </template>
  </VModal>
</template>

<script>
import VModal from "./VModal";

export default {
  data() {
    return {
      temp_courses: [],

    }
  },


  created() {
    this.addCourse();
  },
  methods: {
    uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    initCourse() {
      return {
        id: this.uuid(),
        name: '',
        credit: 0,
        mark: -1,
        selected: true
      };
    },

    validation() {
      const {temp_courses} = this;
      return temp_courses.some((course) => {
        return course.name === "" || course.mark === -1 || course.credit === 0;
      });
    },

    addCourse() {
      const course = this.initCourse();
      this.temp_courses.push(course);
    },

    removeCourse(course) {
      const {id} = course;
      this.temp_courses = this.temp_courses.filter(c => c.id !== id);
    },


    saveChange() {
      if (this.validation()) {
        return this.toastError('Nhập thiếu thông tin ở đâu đó mất rồi');
      }

      this.$emit('handleAddCourses', this.temp_courses);
    },
  },

  computed: {
    lengthTempCourses() {
      const {temp_courses} = this;
      return temp_courses.length;
    }
  },

  components: {
    VModal,
  }
}
</script>
<style lang="scss">

</style>