<template>
  <div>
    <div class="row table-mark">
      <div class="col-12">
        <div class="card">
          <div class="card-body">

            <div class="d-flex flex-column">
              <div class="box-info d-flex flex-column flex-md-row flex-nowrap p-2">
                <div class="d-flex flex-column" style="min-width: 200px;">
                  <div class="user-name mb-1">{{ user.name || "#Unknown" }}</div>
                  <div class="mb-1">GPA của bạn là <span class="fw-bolder">{{ getGPA }}</span></div>
                  <div class="mb-1">Tổng số tín chỉ <span class="fw-bolder">{{ totalCredits }}</span></div>
                </div>
                <div class="d-flex flex-grow-1 flex-column">
                  <h6 class="message mb-0">{{ getTextMessage }}</h6>

                  <!--                  <small class="text-danger mb-1" v-if="getTextMessage">*Điều kiện: tổng số tín chỉ học lại không vượt
                                      quá 5% của tổng tín chỉ
                                      ~
                                      {{ Math.round(totalCredits / 100 * 5) }} tín chỉ.</small>-->
                  <small class="text-danger mb-1" v-if="getTextMessage">Điều kiện: tổng số tín chỉ học lại không vượt
                    quá 5% của tổng tín chỉ.</small>
                  <div class="mb-1" v-html="getTextMandatoryCondition"></div>
                  <div class="mb-1" v-html="getTextSufficientCondition"></div>
                  <div class="mb-1">{{ getSuggest }}</div>
                </div>

              </div>
              <div class="d-flex flex-column">
                <div class="clearfix w-100 mb-2">
                  <button class="btn btn-sm btn-secondary text-light float-end" @click="reload()">
                    Reload lại trang <i class="bi bi-arrow-repeat"></i>
                  </button>
                </div>
                <div class="clearfix w-100 mb-2">
                  <button class="btn btn-sm btn-danger float-end" @click="reset()">Reset từ đầu <i
                      class="bi bi-arrow-counterclockwise"></i></button>
                </div>
              </div>
            </div>


            <div class="clearfix">
              <button class="btn btn-sm btn-success float-end" @click="setShowModal(1)">Thêm <i
                  class="bi bi-plus-lg"></i></button>
            </div>
            <div class="table-responsive-md">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col" style="width: 130px;padding-left: 0;">
                    <button class="btn btn-sm btn-primary ml-0" @click="handleSelectAll()"
                            :disabled="tableMark.length  === 0">{{ textSelectAllBtn }}
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
                  <tr :key="'course' + course.id" :class="getClassRowCourse(course)">
                    <td scope="row" class="">
                      <div class="form-check">
                        <input class="form-check-input mx-auto" type="checkbox" value="1" v-model="course.selected">
                      </div>
                    </td>
                    <td v-html="course.name"></td>
                    <td>{{ course.credit }}</td>
                    <td>{{ parseFloat(course.mark).toFixed(2) }}</td>
                    <td>
                      <div class="clearfix">
                        <button class="btn btn-sm bg-warning bg-gradient text-dark float-start mb-1"
                                @click="editCourse(course)"><i
                            class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-sm bg-danger bg-gradient text-light float-end mb-1"
                                @click="removeCourse(course)">
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
import {BlockCourses} from "../common/block_courses";

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
    calcTableMark(callback) {
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
      this.tableMark = data
          .filter((course) => {
            return !BlockCourses.includes((course.id));
          })
          .map((course) => {
            return {...course, selected: !!course.mark}
          }) || [];
    },

    reload() {
      window.location.reload();
    },

    getClassRowCourse(course) {
      return {
        /*'table-danger': parseFloat(course.mark) === 0,
        'table-warning': [1.0, 1.5, 2.0, 2.5].includes(parseFloat(course.mark)),*/
        'table-red': parseFloat(course.mark) === 0,
        'table-yellow': [1.0, 1.5, 2.0, 2.5].includes(parseFloat(course.mark)),
      }
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
      return this.calcTableMark(function (acc, course) {
        return acc + course.credit * (parseFloat(course.mark) > 0 ? 1 : 0)
      });
    },

    totalMarks() {
      return this.calcTableMark(function (acc, course) {
        return acc + course.mark * course.credit * (parseFloat(course.mark) > 0 ? 1 : 0)
      });
    },


    getGPA() {
      if (!this.totalCredits) return 0;
      return (this.totalMarks / this.totalCredits).toFixed(2);
    },

    getTextMessage() {
      const mandatoryConditionCourses = this.getMandatoryConditionCourses;
      const sufficientConditionCourses = this.getSufficientConditionCourses;
      const gpa = this.getGPA;
      const credits = this.totalCredits;
      if (credits === 0 && sufficientConditionCourses.length === 0) return null;
      if (mandatoryConditionCourses.length === 0) {
        if (credits >= 120) {
          if (gpa >= 3.6) {
            return "Bạn là thực thể siêu cấp vjppro, chúc mừng bạn!"
          }
          if (gpa >= 3.2) {
            return "Bạn có khả năng ra trường bằng giỏi, chúc mừng bạn!";
          }
          if (gpa >= 2.5) {
            return "Bạn có khả năng ra trường bằng khá!";
          }
          if (gpa > 2) {
            return "Bạn có khả năng ra trường bằng TB!";
          }

          return "Bạn chưa thể ra trường lúc này...";
        } else {
          if (gpa > 3.6) {
            return "Bạn có thể đạt mức siêu cấp vjppro!"
          }
          if (gpa > 3.2) {
            return "Bạn có thể đạt bằng giỏi, Cố lên nhé!";
          }
          if (gpa > 2.5) {
            return "Bạn có thể đạt bằng khá, Cố lên nhé!";
          }

          return "Bạn cần phải cố gắng nhiều hơn!";

        }
      } else {
        if (gpa > 3.6) {
          return "Bạn có thể đạt mức siêu cấp vjppro!"
        }
        if (gpa > 3.2) {
          return "Bạn có thể đạt bằng giỏi, Cố lên nhé!";
        }
        if (gpa > 2.5) {
          return "Bạn có thể đạt bằng khá, Cố lên nhé!";
        }

        return "Bạn cần phải cố gắng nhiều hơn!";

      }
    },

    getSuggest() {
      const mandatoryConditionCourses = this.getMandatoryConditionCourses;
      //const sufficientConditionCourses = this.getSufficientConditionCourses;
      const temp = mandatoryConditionCourses.length > 0 ? `lại ${mandatoryConditionCourses.length} môn và` : ''
      let condition = false;
      if (condition) {
        return `Hệ thống gợi ý bạn cần học ${temp} cải thiện`;
      }
      return null;
    },

    getTextMandatoryCondition() {
      const courses = this.getMandatoryConditionCourses;
      if (courses.length === 0) {
        return "Bạn không có môn nào cần học lại.";
      }
      console.log(courses)
      const list = courses.map(course => {
        return course.name
      }).join(', ');
      return `Bạn cần học lại ${courses.length} môn: ${list}.`;
    },

    getMandatoryConditionCourses() {
      const {tableMark} = this;
      const courses = tableMark.filter((course) => {
        return [0].includes(parseFloat(course.mark));
      });
      return courses || [];
    },

    getTextSufficientCondition() {
      const courses = this.getSufficientConditionCourses;
      if (courses.length === 0) {
        return "Bạn là thực thể siêu cấp vjp pro nên hiện tại không cần học cải thiện.";
      }
      const list = courses.map(course => {
        return course.name
      }).join(', ');
      return `Bạn có thể cải thiện ${courses.length} môn: ${list}.`;
    },

    getSufficientConditionCourses() {
      const {tableMark} = this;
      let courses = tableMark.filter((course) => {
        return [1.0, 1.5, 2.0, 2.5].includes(parseFloat(course.mark));
      }) || [];

      if (courses.length === 0) {
        courses = tableMark.filter((course) => {
          return [3.0].includes(parseFloat(course.mark));
        })
      }
      return courses;
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

  .table {

    thead {
      th {
        font-weight: 500 !important;
      }
    }

    td {
      vertical-align: middle;
    }
  }

  table, th, tr, td {
    border-bottom: none;
  }

  .table-red {
    background: rgba(255, 81, 89, 0.55);
  }

  .table-yellow {
    background: rgba(255, 243, 143, 0.52);
  }
}


</style>