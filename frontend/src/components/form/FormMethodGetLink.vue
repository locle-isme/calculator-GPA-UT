<template>
  <div class="row mt-4 justify-content-center">
    <div class="col-12 col-md-6 justify-content-center">
      <div class="card">
        <h5 class="card-header">Điền link kết quả học tập...</h5>
        <div class="card-body">
          <form>
            <div class="mb-2">
              <input v-model="urlInput" type="text" class="form-control form-control-sm"
                     placeholder="Ví dụ https://sv.ut.edu.vn/tra-cuu/ket-qua-hoc-tap.html?k=9tuiGnTHRCO37duCX-1L5V5uXJwQyjfgzkBT6P5lOGE">
              <div class="form-text">Lấy đường dẫn ở đây
                <a href="https://sv.ut.edu.vn/tra-cuu-thong-tin.html" target="_blank">https://sv.ut.edu.vn/tra-cuu-thong-tin.html</a>
              </div>
            </div>
            <button type="submit" class="btn btn-sm btn-primary btn-primary" @click.prevent="getData()"
                    :disabled="!validInput">Kiểm tra
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ApiService} from "../../common/api";

export default {
  data() {
    return {
      //urlInput: "https://sv.ut.edu.vn/tra-cuu/ket-qua-hoc-tap.html?k=9tuiGnTHRCO37duCX-1L5V5uXJwQyjfgzkBT6P5lOGE"
      urlInput: "",
    }
  },

  methods: {
    async getData() {
      const {urlInput} = this;
      try {
        let response = await ApiService.post({url: urlInput});
        let data = response.data;
        const {transcripts, type, message} = data;
        if (type === "success") {
          this.$emit('submitData', transcripts);
          return;
        } else {
          throw message;
        }
      } catch (e) {
        this.toastError("Có lỗi xảy ra, vui lòng thử lại sau...")
        console.log(e);
      }
    }
  },

  computed: {
    validInput() {
      const {urlInput} = this;
      if (!urlInput || !urlInput.trim()) return false;
      return true;
    }
  }
}
</script>

<style scoped>

</style>