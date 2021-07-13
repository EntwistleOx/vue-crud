<template>
  <div>
    <el-card class="box-card">
      <el-table v-loading="loadingState" :data="usersData">
        <el-table-column label="Nombre">
          <template slot-scope="scope">
            {{ scope.row.data.name }}
          </template>
        </el-table-column>
        <el-table-column label="Email">
          <template slot-scope="scope">
            {{ scope.row.data.email }}
          </template>
        </el-table-column>
        <el-table-column label="Operaciones">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Table',
  data() {
    return {};
  },
  computed: {
    ...mapState(['users', 'loading']),
    usersData() {
      return this.users;
    },
    loadingState() {
      return this.loading;
    },
  },
  methods: {
    ...mapActions(['delete_User', 'fetch_Users', 'set_Edit']),
    handleEdit(id) {
      this.set_Edit(id);
    },
    async handleDelete(id) {
      try {
        await this.delete_User(id);
        await this.fetch_Users();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
