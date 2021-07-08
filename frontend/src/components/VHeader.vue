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
             class="btn btn-sm btn-outline-dark me-2 text-light" type="button">
            <i class="bi bi-patch-question"></i> Trợ giúp & hổ trợ</a>
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