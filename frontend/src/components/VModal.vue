<template>
  <!-- Modal -->
  <div class="modal mask" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <slot :max_credit="max_credit" :marks="marks"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">Close
          </button>
          <button type="button" class="btn btn-sm btn-primary" @click="$emit('handleSubmit')">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {},
  data() {
    return {
      max_credit: 10,
      marks: [
        {
          label: 'A',
          value: 4.00,
          description: '8.5 - 10'

        },
        {
          label: 'B+',
          value: 3.5,
          description: '8.0 - 8.4'

        },
        {
          label: 'B',
          value: 3.00,
          description: '7.0 - 7.9'
        },
        {
          label: 'C+',
          value: 2.5,
          description: '6.5 - 6.9',
        },
        {
          label: 'C',
          value: 2.00,
          description: '5.5 - 6.4'
        },
        {
          label: 'D+',
          value: 1.50,
          description: '5.0 - 5.4'
        },
        {
          label: 'D',
          value: 1.00,
          description: '4.5 - 4.9'
        },
        {
          label: 'Other',
          value: 0.00,
          description: '0.0 - 4.4'
        }
      ],
    }
  },

  created() {
  },
  methods: {}
}
</script>

<style lang="scss">
.modal {
  display: block !important;

  &.mask {
    background: rgba(0, 0, 0, 0.32);
  }

  .modal-content {
    min-height: 300px;
  }
}
</style>