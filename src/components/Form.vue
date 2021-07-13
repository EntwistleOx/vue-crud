<template>
  <div id="form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isCreateForm ? "Crear" : "Editar" }} Usuario</span>
      </div>
      <div class="text item">
        <el-form
          :label-position="labelPosition"
          label-width="100px"
          :model="user"
          :rules="rules"
          ref="user"
        >
          <el-form-item label="Nombre" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onCreate('user')"
              v-if="isCreateForm"
            >
              Crear
            </el-button>
            <el-button type="primary" @click="onEdit('user')" v-else
              >Editar</el-button
            >
            <el-button @click="clear('user')">Limpiar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Form",
  data() {
    return {
      labelPosition: "right",
      rules: {
        name: [
          {
            required: true,
            message: "El campo nombre es obligatorio",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "El campo email es obligatorio",
            trigger: "blur",
          },
          {
            type: "email",
            message: "El formato del campo email es incorrecto",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["user", "isCreate"]),
    isCreateForm() {
      return this.isCreate;
    },
  },
  methods: {
    ...mapActions(["create_User", "edit_User", "unset_Edit", "fetch_Users"]),
    onCreate(user) {
      this.$refs[user].validate(async (valid) => {
        if (valid) {
          await this.create_User(this.user);
          await this.fetch_Users();
          this.clear(user);
        } else {
          return false;
        }
      });
    },
    onEdit(user) {
      this.$refs[user].validate(async (valid) => {
        if (valid) {
          await this.edit_User(this.user);
          await this.fetch_Users();
          this.clear(user);
        } else {
          return false;
        }
      });
    },
    clear(user) {
      this.$refs[user].resetFields();
      this.unset_Edit();
    },
  },
};
</script>

<style scoped>
#form {
  padding: 3rem 0;
}
</style>
