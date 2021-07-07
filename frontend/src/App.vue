<template>
  <div>
    <VHeader/>
    <main class="main-container">
      <div class="container">
        <FormChecking v-if="!isAuthenticated" @handleSubmitData="setTranscripts"></FormChecking>
        <TableMark v-if="isAuthenticated" :transcripts="transcripts"/>
      </div>
    </main>
  </div>
</template>

<script>
import VHeader from "./components/VHeader";
import TableMark from "./components/TableMark";
import FormChecking from "./components/FormChecking";

export default {
  name: 'App',
  data() {
    return {
      title: "Calculator GPA ut.edu.vn",
      isAuthenticated: false,
      showModal: 0,
      transcripts: {user: {}, data: []}
    }
  },
  methods: {
    setTranscripts(json) {
      this.setIsAuthenticated(true);
      this.transcripts = json;
    },

    setIsAuthenticated(_type) {
      this.isAuthenticated = _type;
    }
  },

  mounted() {
    const {title} = this;
    document.title = title;
  },
  components: {
    VHeader,
    FormChecking,
    TableMark,
  }
}
</script>

<style lang="scss">
main {
  padding-top: 3rem;
}

.v-toast {
  z-index: 9999999 !important;
  font-size: 0.8em;
}
</style>
