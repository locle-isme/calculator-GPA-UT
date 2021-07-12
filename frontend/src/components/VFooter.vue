<template>
  <nav class="mt-3 navbar navbar-light bg-light footer">
    <div class="container-fluid justify-content-center">
      <div class="copyright">
        <i class="bi bi-github"></i>&nbsp;&nbsp;Github
        <a href="https://github.com/locle-isme" target="_blank" class="text-decoration-none">tui</a>
        &nbsp;<i class="bi bi-suit-heart-fill text-danger"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "VFooter"
}
</script>

<style lang="scss" scoped>
.footer {

  .copyright {
    font-size: 0.8em;
  }
}
</style>