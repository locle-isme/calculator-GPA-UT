<template>
  <div>
    <div class="row table-mark">
      <div class="col-12">
        <div class="card">
          <div class="card-body">

            <div class="d-flex">
              <div class="box-info d-flex flex-grow-1 flex-column p-2">
                <div class="user-name">{{ user.name || "#Unknown" }}</div>
                <div>GPA của bạn là <span class="fw-bolder">{{ getGPA }}</span></div>
                <div>Tổng số tín chỉ <span class="fw-bolder">{{ totalCredits }}</span></div>
              </div>
              <div class="d-flex flex-grow-1 flex-column">
                <div class="clearfix w-100 mb-2">
                  <button class="btn btn-sm btn-danger float-end" @click="reset()">Reset từ đầu</button>
                </div>
                <div class="clearfix w-100 mb-2">
                  <button class="btn btn-sm btn-secondary text-light float-end" @click="reload()">Reload lại trang
                  </button>
                </div>
              </div>
            </div>


            <div class="clearfix">
              <button class="btn btn-sm btn-success float-end" @click="setShowModal(1)">Thêm</button>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col" style="width: 20%">
                    <button class="btn btn-sm btn-primary ml-0" @click="handleSelectAll()">{{ textSelectAllBtn }}
                    </button>
                  </th>
                  <th scope="col">Tên học phần</th>
                  <th scope="col">Số tín chỉ</th>
                  <th scope="col">Điểm</th>
                  <th scope="col" style="width: 8%"></th>
                </tr>
                </thead>
                <tbody>
                <template v-for="course in tableMark">
                  <tr :key="'course' + course.id" :class="{'table-danger': parseFloat(course.mark) === 0}">
                    <th scope="row">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="1" v-model="course.selected">
                      </div>
                    </th>
                    <td v-html="course.name"></td>
                    <td>{{ course.credit }}</td>
                    <td>{{ parseFloat(course.mark).toFixed(2) }}</td>
                    <td>
                      <div class="clearfix">
                        <button class="btn btn-sm bg-warning text-dark float-start" @click="editCourse(course)"><i
                            class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-sm bg-danger text-light float-end" @click="removeCourse(course)">
                          <i class="bi bi-eraser"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalAddNewCourse v-if="showModal === 1" @handleAddCourses="handleAddCourses"
                       @close="showModal = 0"/>
    <ModalEditCourse v-if="showModal === 2" :course="currentEdit" @handleUpdateCourse="handleUpdateCourse"
                     @close="showModal = 0"/>
  </div>
</template>

<script>
import ModalAddNewCourse from "./ModalAddNewCourse";
import ModalEditCourse from "./ModalEditCourse";

export default {
  props: {
    transcripts: {
      type: Object,
    }
  },
  data() {
    return {
      isSelectAll: 1,
      showModal: 0,
      tableMark: [],
      currentEdit: {}
    }
  },

  created() {
    this.reset();
  },

  methods: {
    callBackTableMark(callback) {
      const {tableMark} = this;
      return tableMark
          .filter(course => {
            return course.selected;
          })
          .reduce(callback, 0)
    },

    handleAddCourses(courses) {
      this.setShowModal(0);
      this.tableMark = [...courses, ...this.tableMark];
    },

    handleUpdateCourse(_course) {
      this.setShowModal(0);
      const course = this.tableMark.find(c => c.id === _course.id);
      course.name = _course.name;
      course.mark = _course.mark;
      course.credit = _course.credit;
    },

    editCourse(course) {
      this.currentEdit = course;
      this.setShowModal(2);
    },

    setShowModal(_type) {
      this.showModal = _type;
    },

    removeCourse(course) {
      this.tableMark = this.tableMark.filter(c => c.id !== course.id);
    },

    handleSelectAll() {
      const status = this.isSelectAll ? 0 : 1;
      this.tableMark = this.tableMark.map((course) => {
        course.selected = status;
        return course;
      })
      this.isSelectAll = !this.isSelectAll;
    },

    reset() {
      const {data} = this.transcripts;
      this.tableMark = data.map((course) => {
        return {...course, selected: !!course.mark}
      }) || [];
    },

    reload() {
      window.location.reload();
    }
  },

  computed: {
    textSelectAllBtn() {
      const {isSelectAll} = this;
      return isSelectAll ? "Bỏ chọn tất cả" : "Chọn tất cả";
    },
    user() {
      const {user} = this.transcripts;
      return user || {};
    },


    totalCredits() {
      return this.callBackTableMark(function (acc, course) {
        return acc + course.credit * (parseFloat(course.mark) > 0 ? 1 : 0)
      });
    },

    totalMarks() {
      return this.callBackTableMark(function (acc, course) {
        return acc + course.mark * course.credit * (parseFloat(course.mark) > 0 ? 1 : 0)
      });
    },


    getGPA() {
      if (!this.totalCredits) return 0;
      return (this.totalMarks / this.totalCredits).toFixed(2);
    }

  },
  components: {
    ModalEditCourse,
    ModalAddNewCourse
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/mixins/breakpoints";
.table-mark {

  .box-info {
    .user-name {
      font-size: 1.1em !important;
      font-weight: bolder;
    }

    font-size: 0.85em;

    .gpa {

    }


  }
}


</style>