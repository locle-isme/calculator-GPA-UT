<template>
  <div class="row mt-4 method-console">
    <div class="col-12 col-md-8">
      <div class="card">
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="exampleJSONData" class="col-form-label-sm">Dữ liệu đã lấy</label>
              <textarea v-model="rawData" rows="5" type="text" class="form-control" id="exampleJSONData"
                        aria-describedby="JSONData"></textarea>
              <button type="submit" class="btn btn-sm btn-primary btn-primary my-2" @click.prevent="checkingJSON()">Kiểm
                tra
              </button>


              <div class="form-text"> Click vào
                <button class="badge bg-success mx-2" @click.prevent="copyHelper()">ĐÂY</button>
                <textarea style="max-height: 0;max-width: 0; font-size: 0;" ref="codeHelper" name="codeHelper" id=""
                          cols="1" rows="1">
                try { let userInfoDOM = document.querySelector('.user-info'); let userInfo = { name: userInfoDOM?.children[1]?.text || null, }; let rowTableData = document.querySelectorAll('#xemDiem_aaa tbody tr'); if (!rowTableData.length) { rowTableData = document.querySelectorAll('table#xemDiem tbody tr'); } let listFilter = [...rowTableData].filter(row => row.childElementCount === 12); let listBanned = [ '010100700704', '010100700604', '010100410121', '010100700804', '010100410505', '010100410601', '010100410802', ]; let tempTableData = listFilter.map(row => { if (row.children[0].classList.contains('row-head')) { return null; } if (listBanned.includes(row.children[1].innerText)) { return null; } return { id: row.children[1].innerText.trim(), name: row.children[2].innerText.trim(), credit: row.children[3].innerText.trim(), mark: parseFloat(row.children[8].innerText.trim().replace(',', '.').replace(' ', '')).toFixed(2) } }).filter(row => row); let listCourseID = tempTableData.map(row => row.id); let resultTable = tempTableData.filter((row, index) => { return index === listCourseID.indexOf(row.id); }); let result = { user: userInfo, data: resultTable, }; copy(JSON.stringify(result)); alert('Copy thành công, qua kia dán vào ô thui!'); } catch (e) { alert('Có lỗi xảy ra, thử lại sau...'); }
              </textarea>
              </div>
              <div class="form-text">Đăng nhập vào <a href="https://sv.ut.edu.vn" target="_blank"
                                                      class="btn btn-sm badge bg-dark text-light text-decoration-none">Trang
                sinh
                viên</a> và
                truy cập vào
                trang <a
                    href="https://sv.ut.edu.vn/ket-qua-hoc-tap.html" target="_blank"
                    class="btn btn-sm badge bg-warning text-light text-decoration-none">Bảng điểm</a>.
              </div>
              <div class="form-text">Bấm tổ hợp phím <kbd class="text-sm">Ctrl + Shift + J</kbd> hoặc <kbd>F12 &gt;
                Console</kbd> và
                dán nội dung vừa sao chép vào bảng vừa hiện ra.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4">
      <div class="card">
        <h6 class="card-header text-center">Không lấy được dữ liệu?</h6>
        <div class="card-body">
          <form class="text-center">
            <button class="btn btn-sm btn-dark" @click.prevent="submitData()">Zô luôn <i
                class="bi bi-box-arrow-in-right"></i></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toastSuccess} from "../../../../../clone-tiki/src/common/toast";

export default {
  data() {
    return {
      rawData: "",
    }
  },
  methods: {
    checkingJSON() {
      try {
        let JSONData = JSON.parse(this.rawData);
        if (JSONData.user && JSONData.data) {
          this.submitData(JSONData);
        } else {
          throw "error";
        }
      } catch (e) {
        console.log(e)
        this.toastError('Có lỗi xảy ra, thử lại sau...')
      }
    },

    submitData(JSONData = {user: {}, data: []}) {
      this.$emit('submitData', JSONData);
    },

    copyHelper() {
      console.log('helper')
      let el = this.$refs.codeHelper;
      el.select();
      document.execCommand("copy");
      toastSuccess("Copy thành công")
    }
  }
}
</script>

<style scoped lang="scss">
.method-console {
  kbd {
    padding: 0.1rem 0.4rem;
  }
}
</style>