<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <Form />
          <Table />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Form from "@/components/Form.vue";
import Table from "@/components/Table.vue";

export default {
  name: "Home",
  components: {
    Form,
    Table,
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions(["fetch_Users"]),
    fetchUsers() {
      this.fetch_Users();
    },
  },
};
</script>
