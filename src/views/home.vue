<template>
  <div class="tw-p-2 tw-bg-slate-600 tw-h-screen">
    <div class="tw-flex tw-items-center tw-justify-around">
      <van-button type="primary" size="small" @click="changeUserName('李四')"
        >切换到【李四】</van-button
      >
      <van-button
        class="tw-ml-3"
        type="primary"
        size="small"
        @click="changeUserName('perchecc')"
        >切换为【perchecc】</van-button
      >
    </div>

    <div class="tw-text-emerald-300 tw-mb-2 tw-mt-3">我是{{ stateUserName }}</div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { showToast } from "vant";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
// import { getToken } from "@/apis/user";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    let userStore = useUserStore();

    const changeUserName = async (name) => {
      // store解构后会丢失响应式，使用pinia的storeToRefs可以解决
      userStore.updateName(name);
      // getter获取完整姓名
      showToast(userStore.getterFullName);

      // const { data } = await getToken();
      // showToast(data);
    };

    // 计算属性 获取user缓存用户姓名
    const stateUserName = computed(() => {
      // store解构后会丢失响应式，使用pinia的storeToRefs可以解决
      const { name } = storeToRefs(userStore);
      return name;
    });

    return {
      ...toRefs(state),
      changeUserName,
      stateUserName,
    };
  },
};
</script>

<style scoped lang="scss">
// .demo {
//   min-width: 100px;
//   height: 100px;
//   background-color: $color-green;
// }
</style>
