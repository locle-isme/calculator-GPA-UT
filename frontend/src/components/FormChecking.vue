<template>
  <div class="form-checking">
    <div class="row">
      <div class="col-12">
        <ul class="nav nav-tabs">
          <template v-for="tab in navTabs">
            <li class="nav-item" :key="'tab' + tab.type">
              <div class="nav-link" :class="{active: currentTab === tab.type}" @click="currentTab = tab.type">
                {{ tab.label }}
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <FormMethodConsole v-if="currentTab === 1" @submitData="submitData"></FormMethodConsole>
    <FormMethodGetLink v-if="currentTab === 2" @submitData="submitData"></FormMethodGetLink>
  </div>
</template>

<script>
import FormMethodConsole from "./form/FormMethodConsole";
import FormMethodGetLink from "./form/FormMethodGetLink";

export default {
  data() {
    return {
      currentTab: 2,
      navTabs: [
        {type: 2, label: 'Điền link kết quả học tập'},
        {type: 1, label: 'F12 bàng điểm'},
      ]
    }
  },

  methods: {
    submitData(jsonData) {
      //console.log(jsonData)
      this.$emit('handleSubmitData', jsonData);
    }
  },
  components: {
    FormMethodConsole,
    FormMethodGetLink
  }
}
</script>

<style lang="scss">
.form-checking {
  .nav-tabs {
    cursor: pointer;

    .nav-link {
      user-select: none;
      font-size: 0.9em;
    }
  }
}
</style>