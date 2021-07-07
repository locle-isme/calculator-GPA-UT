<template>
  <header>
    <!--Navbar-->

    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <div class="navbar-brand home" @click="refresh()">
          <i class="bi bi-house-door"></i>
          Calculator GPA
        </div>
      </div>
    </nav>
    <!--/.Navbar-->
  </header>
</template>

<script>
export default {
  methods:{
    refresh(){
      window.location.reload();
    }
  }
}
</script>

<style lang="scss">
.home{
  cursor: pointer;
}
</style>