<template>
  <header class="header">
    <!--Navbar-->

    <nav class="navbar navbar-light bg-ut">
      <div class="container-fluid">
        <div class="navbar-brand home text-light" @click="refresh()">
          <i class="bi bi-house-door"></i>
          Calculator GPA
        </div>
        <div class="d-flex">
          <a href="https://www.facebook.com/LocLe.isme" target="_blank"
             class="btn btn-outline-dark me-2 text-light" type="button">
            <i class="fa fa-support"></i> Hổ trợ/báo lỗi <i class="bi bi-exclamation-triangle"></i></a>
        </div>
      </div>
    </nav>
    <!--/.Navbar-->
  </header>
</template>

<script>
export default {
  methods: {
    refresh() {
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">

.header {
  .bg-ut {
    color: #fafafa;
    background: #005ab7 !important;
  }

  .home {
    cursor: pointer;
  }

}
</style>