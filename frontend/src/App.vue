<template>
  <div>
    <VHeader/>
    <main class="main-container">
      <div class="container">
        <FormChecking v-if="!isAuthenticated" @handleSubmitData="setTranscripts"></FormChecking>
        <TableMark v-if="isAuthenticated" :transcripts="transcripts"/>
      </div>
    </main>
    <VFooter/>
  </div>
</template>

<script>
import VHeader from "./components/VHeader";
import VFooter from "./components/VFooter";
import TableMark from "./components/TableMark";
import FormChecking from "./components/FormChecking";

//import datajson from "./data.json"

export default {
  name: 'App',
  data() {
    return {
      title: "Calculator GPA ut.edu.vn",
      isAuthenticated: false,
      showModal: 0,
      //transcripts: datajson,
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
    VFooter,
    FormChecking,
    TableMark,
  }
}
</script>

<style lang="scss">
.main-container {
  min-height: calc(100vh - 56px - 35px - 1rem);
  padding-top: 3rem;
}

.v-toast {
  z-index: 9999999 !important;
  font-size: 0.8em;
}

.card {
  transition: 300ms;
}
</style>
