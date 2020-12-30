<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <i style="font-size: .4rem;" v-if="firstName || lastName">{{ lastName }} {{ firstName }}</i>
      <i style="font-size: .3rem;" v-else>{{ email }}</i>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" alt="" /> -->
          <img />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/"><el-dropdown-item>总体概览</el-dropdown-item></router-link>
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="modify_password_button"><span style="display:block;">修改密码</span></el-dropdown-item>
          <el-dropdown-item divided @click.native="logout"><span style="display:block;">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--修改密码-->
    <el-dialog :visible.sync="modify_dialog">
      <el-form ref="modify_dialog_from" :rules="modify_from_rules" :model="modify_from" label-width="80px">
        <el-form-item label="当前密码" prop="oldPassword"><el-input v-model="modify_from.oldPassword"></el-input></el-form-item>
        <el-form-item label="新密码" prop="newPassword"><el-input v-model="modify_from.newPassword"></el-input></el-form-item>
        <el-form-item label="确认密码" prop="twoNewPassword"><el-input v-model="modify_from.twoNewPassword"></el-input></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modify_password">立即修改</el-button>
          <el-button @click="modify_dialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import store from '@/store';
import { modify_password } from '@/api/user';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  data() {
    const twoNewPassword = (rule, value, callback) => {
      if (value == null) {
        callback(new Error('请确认新密码'));
      } else if (this.modify_from.newPassword !== this.modify_from.twoNewPassword) {
        callback(new Error('与新密码不一致'));
      } else {
        callback();
      }
    };
    return {
      firstName: '',
      lastName: '',
      email: '',
      modify_from: {
        newPassword: '',
        oldPassword: '',
        twoNewPassword: ''
      },
      modify_dialog: false,
      modify_from_rules: {
        oldPassword: [{ required: true, message: '请输当前密码', trigger: 'blur' }, { min: 6, message: '密码至少6位', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, message: '密码至少6位', trigger: 'blur' }],
        twoNewPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }, { required: true, trigger: 'blur', validator: twoNewPassword }]
      }
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    modify_password_button() {
      this.modify_from.oldPassword = '';
      this.modify_from.newPassword = '';
      this.modify_dialog = true;
    },
    modify_password() {
      this.$refs.modify_dialog_from.validate(valid => {
        if (valid) {
          modify_password(this.modify_from).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '修改密码成功'
              });
              this.modify_dialog = false;
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              });
            }
          });
        }
      });
    }
  },
  created() {
    let userInfo = store.state.user.user;
    this.firstName = userInfo.firstName;
    this.lastName = userInfo.lastName;
    this.email = userInfo.email;
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
